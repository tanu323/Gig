const router = require('express')()
const provider = require('./provider/providerIndex')
const candidate = require('./candidate/candidateIndex')
const admin = require('./admin/main')
const { verify } = require('jsonwebtoken')
const utils = require('../helpers/utils')
const { triggerMail } = require('../helpers/mailing')
const axios = require('axios')


router
    .get('/fetchPlace',async(req,res)=>{
        try {
            const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.string}&types=geocode&key=${process.env.GOOGLE_API_KEY}`)
            return res.status(200).json(utils.successFormat('search_data',data))
        } catch (error) {
            return res.status(500).json(utils.errorFormat('Internal Server Error'))
        }
    })
    .get('/', async (req, res) => {
        try {
            if (!req.query.token) return res.status(404).json(utils.errorFormat('Required Token', 404))
            const token = req.query.token;
            return res.status(200).json(utils.successFormat('data', { name: token.split(',')[0], type: token.split(',')[1] }))
            // return res.status(200).json(utils.successFormat('data', verify(req.query.token, 'secretKey')))
        } catch (error) {
            return res.status(500).json(utils.errorFormat('Internal Server Error'))
        }
    })
    .get('/trigger-mail', async (req, res) => {
        try {
            triggerMail()
            return res.status(200).json(utils.successFormat('mail triggered'))
        } catch (error) {
            return res.status(500).json(utils.errorFormat('Internal Server Error'))
        }
    })
    .use('/provider', provider)
    .use('/candidate', candidate)
    .use('/admin', admin)

module.exports = router