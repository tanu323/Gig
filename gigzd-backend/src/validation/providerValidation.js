const joi = require('joi')
const { errorFormat } = require('../helpers/utils')

exports.validateRegisterData = (req, res, next) => {
    try {
        const schema = joi.object({
            contact_person: joi.string().required(),
            phone_number: joi.string().required(),
            company_name: joi.string().required(),
            gst_number: joi.string().optional(),
            pan: joi.string().optional(),
            bank_account_number: joi.string().optional(),
            ifsc_code: joi.string().optional(),
            company_address: joi.string().optional(),
        })
        const result = schema.validate(req.body);
        if (result.error) {
            return res.status(400).json(errorFormat(result.error.message))
        }
        next()
    } catch (error) {
        return res.status(400).json(errorFormat(error.message))
    }
}

exports.validateJobPostData = (req, res, next) => {
    try {
        const schema = joi.object({
            company_name: joi.string().required(),
            education: joi.string().required(),
            no_of_positions: joi.string().required(),
            position: joi.string().required(),
            min_age: joi.string().required(),
            max_age: joi.string().required(),
            designation: joi.string().required(),
            package: joi.string().required(),
            stipend: joi.string().required(),
            door_no: joi.string().required(),
            street_name: joi.string().required(),
            city: joi.string().required(),
            pin_code: joi.string().required(),
            description: joi.string().optional(),
        })
        const result = schema.validate(req.body);
        if (result.error) {
            return res.status(400).json(errorFormat(result.error.message))
        }
        next()
    } catch (error) {
        return res.status(400).json(errorFormat(error.message))
    }
}
exports.validateProfilePatchData = (req, res, next) => {
    try {
        const schema = joi.object({
            companyName: joi.string().required(),
            bank_account_number: joi.string().optional(),
            ifsc_code: joi.string().optional(),
        })
        const result = schema.validate(req.body);
        if (result.error) {
            return res.status(400).json(errorFormat(result.error.message))
        }
        next()
    } catch (error) {
        return res.status(400).json(errorFormat(error.message))
    }
}