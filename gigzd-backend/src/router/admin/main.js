const router = require('express')()
const utils = require('../../helpers/utils');
const admin = require('../../services/admin')
const { validateApproval } = require('../../validation/adminValidation')
const multer = require('multer')
const upload = multer()

router
    .get('/', async (req, res) => {
        try {
            const result = await admin.getData()
            return res.status(200).json(utils.successFormat('Company register', result))
        } catch (error) {
            return res.status(400).json(utils.errorFormat('Internal Server Error'))
        }
    })
    .patch('/verify', upload.none(), validateApproval, async (req, res) => {
        try {
            const result = await admin.updateData(req.body.id);
            if (!result.rowCount) return res.status(409).json(utils.errorFormat('User Verified Already / Id Not exist'))
            if (!req.body.is_approved) return res.status(403).json(utils.errorFormat('User Denied'));
            return res.status(200).json(utils.successFormat('Data Updated, User Verified', [{ id: req.body.id }]))
        } catch (error) {
            return res.status(400).json(utils.errorFormat('Internal Server Error'))
        }
    })

module.exports = router