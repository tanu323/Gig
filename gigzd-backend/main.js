require('dotenv').config()
const express = require('express')
const app = express()
const port = 3002
const path = require('./src/router/index')
const { db } = require('./src/database/main')
const { connection } = require('./src/helpers/mysql')
const cors = require('cors')
const CronJob = require('cron').CronJob;
const { triggerMail } = require('./src/helpers/mailing')

app
    .use(cors())
    .use(express.json())
    .use('/image/user', express.static(process.env.IMAGE_STATIC_DIRECTORY_USER))
    .use('/image/company', express.static(process.env.IMAGE_STATIC_DIRECTORY_COMPANY))
    .use(express.urlencoded({ extended: true }))
    .use('/', path)
    .listen(port, () => {
        console.log("server listening on port: ", port);
    })


db.connect((err) => {
    if (err) {
        console.error('connection error:', err.stack)
    } else {
        console.log('Postgres Database Connected')
    }
})

connection.connect((err) => {
    if (err) throw err;
    console.log("MySql Database Connected");
})

new CronJob(
    '0 13 * * *',
    () => triggerMail(),
    null,
    true
);
