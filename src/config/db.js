const psql = require("pg")
const { Pool } = psql

const db = new Pool({
    user: "yoga",
    host: "localhost",
    database: "gargyo_coffee",
    password: "yoga1504",
    port: 5432,
})

module.exports = db