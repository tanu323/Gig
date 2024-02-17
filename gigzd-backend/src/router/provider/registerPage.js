const router = require('express')()
const provider = require('../../services/provider')
const { validateRegisterData } = require('../../validation/providerValidation')
const utils = require('../../helpers/utils')



const multer = require('multer')
var fileName;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.COMPANY_IMAGE_PATH)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        fileName = file.fieldname + '-' + uniqueSuffix + '-' + file.originalname;
        cb(null, fileName)
    }
})
const upload = multer({ storage: storage })



router
    .get('/', async (req, res) => {
        try {
            //get available data from existing dp 
            const company_name = req.query.companyName;
            if (!company_name) return res.status(400).json(utils.errorFormat('Required Info - Company Name'))
            const userData = await provider.getUserData(company_name)
            return res.status(200).json(utils.successFormat('User Data', userData))
        } catch (error) {
            return res.status(500).json(utils.errorFormat('Internal Server Error'))
        }
    })
    .post('/', upload.single('company_logo'), validateRegisterData, async (req, res) => {
        try {
            if (fileName) req.body['company_logo'] = `/image/company/${fileName}`;
            const registerData = await provider.addCompanyData(req.body)
            if (!registerData.rowCount) return res.status(400).json(utils.errorFormat(registerData.detail))
            return res.status(200).json(utils.successFormat('Posted For Approval', [{ company_name: req.body.company_name }]))
        } catch (error) {
            return res.status(500).json(utils.errorFormat('Internal Server Error'))
        }
    })

module.exports = router
