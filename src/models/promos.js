const db = require("../config/db")

const getPromosFromServer = () => {
    return new Promise((resolve, reject) => {
        db.query("select * from promos")
            .then(result => {
                const response = {
                    total: result.rowCount,
                    data: result.rows
                }
                resolve(response)
            })
            .catch(err => {
                reject({ status: 500, err })
            })
    })
}

const findPromo = (query) => {
    return new Promise((resolve, reject) => {
        const { promo_code, order, sort } = query
        let sqlQuery = "select * from promos where lower(promo_code) like lower('%' || $1 || '%')"
        if (sort) {
            sqlQuery += " order by " + sort + " " + order
        }
        db.query(sqlQuery, [promo_code])
            .then((result) => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "Promos Not Found" })
                }
                const response = {
                    total: result.rowCount,
                    data: result.rows
                }
                resolve(response)
            })
            .catch((err) => {
                reject({ status: 500, err })
            })
    })
}

const createNewPromo = (body) => {
    return new Promise((resolve, reject) => {
        const { product_id, promo_start, promo_end, promo_code, promo_discount } = body;
        const sqlQuery = "INSERT INTO promos(product_id, promo_start, promo_end, promo_code, promo_discount) VALUES($1, $2, $3, $4, $5) RETURNING *"
        db.query(sqlQuery, [product_id, promo_start, promo_end, promo_code, promo_discount])
            .then(result => {
                const response = {
                    data: result.rows[0]
                }
                resolve(response)
            })
            .catch(err => {
                reject({ status: 500, err })
            })
    })
}

const updatePromo = (promo_id, body) => {
    return new Promise((resolve, reject) => {
        const { product_id, promo_start, promo_end, promo_code, promo_discount } = body
        const sqlQuery = "UPDATE promos SET product_id=$1, promo_start=$2, promo_end=$3, promo_code=$4, promo_discount=$5 WHERE promo_id=$6 returning *;"
        db.query(sqlQuery, [product_id, promo_start, promo_end, promo_code, promo_discount, promo_id])
            .then(result => {
                const response = {
                    data: result.rows
                }
                resolve(response)
            })
            .catch(err => {
                reject({ status: 500, err })
            })
    })
}

const deletePromo = (promo_id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "DELETE FROM promos WHERE promo_id = $1 RETURNING *"
        db.query(sqlQuery, [promo_id])
            .then(result => {
                const response = {
                    data: result.rows
                }
                resolve(response)
            })
            .catch(err => {
                reject({ status: 500, err })
            })
    })
}

module.exports = {
    getPromosFromServer,
    findPromo,
    createNewPromo,
    updatePromo,
    deletePromo
}