const { Client } = require('pg')

exports.db = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Postgres@1112',
    database: 'gag'
})