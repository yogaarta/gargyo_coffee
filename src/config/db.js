const psql = require("pg");
const { Pool } = psql;

// const { DB_USER, DB_HOST, DB_DATABASE, DB_PASS, DB_PORT} = process.env;

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    }
});

module.exports = db;