const router = require('express')()
const utils = require('../../helpers/utils')
const provider = require('../../services/provider')
const { validateJobPostData } = require('../../validation/providerValidation')
const multer = require('multer')
const upload = multer()

router
    .post('/post-job', upload.none(), validateJobPostData, async (req, res) => {
        try {
            const registerData = await provider.addJobPost(req.body)
            if (!registerData.rowCount) return res.status(400).json(utils.errorFormat(registerData.detail))
            return res.status(200).json(utils.successFormat('Job Posted', [{ designation: req.body.designation }]))
        } catch (error) {
            return res.status(500).json(utils.errorFormat('Internal Server Error'))
        }
    })

module.exports = router
