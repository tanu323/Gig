const joi = require('joi')
const { errorFormat } = require('../helpers/utils')

exports.validateApproval = (req, res, next) => {
    try {
        const schema = joi.object({
            id: joi.number().required(),
            is_approved: joi.boolean().required(),
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
