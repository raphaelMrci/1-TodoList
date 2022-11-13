const mysql = require('mysql2');
const dotenv = require('dotenv');

const config = dotenv.config().parsed;

const db = mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME
});

module.exports = db;
