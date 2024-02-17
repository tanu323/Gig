const router = require('express')()
const utils = require('../../helpers/utils')
const candidate = require('../../services/candidate')

router
    .get('/', async (req, res) => {
        try {
            if (!req.query.userName) return res.status(400).json(utils.errorFormat('Required Info - User Name'))
            const data = await candidate.getUserHistory(req.query.userName)
            return res.status(200).json(utils.successFormat('User History', data))
        } catch (error) {
            return res.status(500).json({ data: { status: 'Failed', message: error } })
        }
    })

module.exports = router