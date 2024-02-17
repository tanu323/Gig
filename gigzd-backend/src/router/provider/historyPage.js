const router = require('express')()
const utils = require('../../helpers/utils')
const provider = require('../../services/provider')

router
    .get('/', async (req, res) => {
        try {
            const registerData = await provider.getJobPost(req.query)
            if (registerData.length === 0) return res.status(200).json({ data: { status: 'Success', message: [] } })
            return res.status(200).json({ data: { status: 'Success', message: registerData } })
        } catch (error) {
            return res.status(500).json({ data: { status: 'Failed', message: 'Internal Server Error' } })
        }
    })
    .get('/get-applicant-data', async (req, res) => {
        if (!req.query.id) return res.status(400).json(utils.errorFormat('Required Info: Job Id'))
        const applicantData = await provider.getApplicantData(req.query.id)
        return res.status(200).json(utils.successFormat('Applicant Data', applicantData))
    })
    .post('/add-applicant-status',async(req,res)=>{
        try {
            const result = await provider.addApplicationStatus(req.body)
            return res.status(200).json(utils.successFormat('Application status Added'))
        } catch (error) {
            console.log("Error from application status post router");
            return res.status(500).json({ data: { status: 'Failed', message: 'Internal Server Error' } })
        }
    })
    .patch('/', async (req, res) => {
        // try {
        //     const result = await provider.getJobPost(req.query)
        //     return res.status(200).json({ data: { status: 'Success', result } })
        // } catch (error) {
        //     return res.status(500).json({ data: { status: 'Failed', message: 'Internal Server Error' } })
        // }
    })
    .delete('/', async (req, res) => {
        try {
            const jobId = req.query.id;
            if (!jobId) return res.status(400).json(utils.errorFormat('Required Info - ID'))
            const result = await provider.deleteJob(jobId)
            if (result.rowCount === 0) return res.status(400).json(utils.errorFormat("Id Not Found"))
            return res.status(200).json(utils.successFormat('Job Deleted', [{ id: jobId }]))
        } catch (error) {
            return res.status(500).json({ data: { status: 'Failed', message: 'Internal Server Error' } })
        }
    })
module.exports = router
