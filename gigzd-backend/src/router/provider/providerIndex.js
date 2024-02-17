const router = require('express')()
const register = require('./registerPage')
const home = require('./homePage')
const history = require('./historyPage')
const profile = require('./profilePage')

router
    .use('/register', register)
    .use('/home', home)
    .use('/history', history)
    .use('/profile', profile)

module.exports = router