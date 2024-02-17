const joi = require('joi')
const { errorFormat } = require('../helpers/utils')

exports.validateUserInfData = (req, res, next) => {
    try {
        const schema = joi.object({
            user_name: joi.string().required(),
            education: joi.string().required(),
            course: joi.string().required(),
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

exports.validateJobApplyData = (req, res, next) => {
    try {
        const schema = joi.object({
            user_name: joi.string().required(),
            company_name: joi.string().required(),
            job_id: joi.number().required(),
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
