const router = require('express')()
const provider = require('../../services/provider')
const { validateProfilePatchData } = require('../../validation/providerValidation')
const utils = require('../../helpers/utils')
const multer = require('multer')
const upload = multer()

router
    .get('/', async (req, res) => {
        try {
            //get available data from existing dp 
            if (!req.query.companyName) return res.status(400).json(utils.errorFormat('Required Info - Company Name'))
            const data = await provider.getUserData(req.query.companyName)
            return res.status(200).json(utils.successFormat('Profile Data', data))
        } catch (error) {
            return res.status(500).json(utils.errorFormat("internal Server Error"))
        }
    })

    .patch('/update', upload.none(), validateProfilePatchData, async (req, res) => {
        try {
            if (!req.body.bank_account_number && !req.body.ifsc_code) return res.status(400).json(utils.errorFormat('Required Bank Account Number or IFSC Code to update. Both cannot be empty'))
            const result = await provider.updateProfile(req.body)
            if (!result.rowCount) return res.status(404).json(utils.errorFormat('Company Name Not Found'))
            return res.status(200).json(utils.successFormat('Given Data Updated Successfully'))
        } catch (error) {
            return res.status(500).json(utils.errorFormat('Internal Server Error'))
        }
    })


module.exports = router
