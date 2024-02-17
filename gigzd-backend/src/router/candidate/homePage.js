const router = require('express')()
const utils = require('../../helpers/utils');
const candidate = require('../../services/candidate');
const validate = require('../../validation/userValidation');

const multer = require('multer')
const upload = multer()

//use below code if profile picture needed

// var fileName;
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, process.env.USER_IMAGE_PATH)
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         fileName = file.fieldname + '-' + uniqueSuffix + '-' + file.originalname;
//         cb(null, fileName)
//     }
// })
// const upload = multer({ storage: storage })

router
    .get('/', async (req, res) => {
        if (!req.query.userName) return res.status(404).json(utils.errorFormat('Required Info: UserName', 404))
        if (req.query.search) {
            const data = await candidate.getSearchSuggestion(req.query.search)
            return res.status(200).json(utils.successFormat('User Data', data))
        }
        if (req.query.filter) {
            const data = await candidate.getJopPosted('posted_jobs', req.query.userName, req.query.filter.split('-'))
            return res.status(200).json(utils.successFormat('data', data))
        }
        const data = await candidate.getJopPosted('posted_jobs', req.query.userName)
        return res.status(200).json(utils.successFormat('Posted Jobs', data))
    })
    .get('/userData', async (req, res) => {
        //get available data from existing dp 
        const userName = req.query.userName;
        if (!userName) return res.status(400).json(utils.errorFormat('Required Info - User Name'))
        const data = await candidate.getUserDetail('user_table', userName)
        return res.status(200).json(utils.successFormat('User Data', data))
    })
    .post('/', validate.validateUserInfData, async (req, res) => {
        try {
            // req.body['profile_image'] = `/image/user/${fileName}`;  //used to add image path.
            req.body['profile_image'] = `***`;
            const data = await candidate.addUserDetail(req.body)
            if (!data.rowCount) return res.status(400).json(utils.errorFormat(data.detail))
            return res.status(200).json(utils.successFormat('User Added', [{ user: req.body.user_name }]))
        } catch (error) {
            console.log("error:", error);
            return res.status(500).json(utils.errorFormat('Internal Server Error'))
        }
    })
    .post('/job-apply', upload.none(), validate.validateJobApplyData, async (req, res) => {
        try {
            const data = await candidate.applyJob(req.body)
            if (data === 0) return res.status(403).json(utils.errorFormat('Already Applied For the Job', 403))
            if (!data.rowCount) return res.status(400).json(utils.errorFormat(data.detail))
            return res.status(200).json(utils.successFormat('job Applied', [{ id: req.body.job_id }]))
        } catch (error) {
            return res.status(500).json(utils.errorFormat("Internal Server Error"))
        }
    })

module.exports = router