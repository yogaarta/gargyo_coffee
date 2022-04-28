const psql = require("pg");
const { Pool } = psql;

const { DB_USER, DB_HOST, DB_DATABASE, DB_PASS, DB_PORT} = process.env;

const db = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASS,
    port: DB_PORT,
});

module.exports = db;