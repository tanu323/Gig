const router = require('express')()
const home = require('./homePage')
const history = require('./historyPage')

router
    .use('/home', home)
    .use('/history', history)

module.exports = router