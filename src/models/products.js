const { response } = require("express")
const db = require("../config/db")

const getProductsFromServer = () => {
    return new Promise((resolve, reject) => {
        db.query("select * from products")
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

const getSingleProductsFromServer = (id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "select * from products where product_id = $1"
        db.query(sqlQuery, [id])
            .then((result) => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "Product Not Found" })
                }
                const response = {
                    data: result.rows
                }
                resolve(response)
            })
            .catch((err) => {
                reject({ status: 500, err })
            })
    })
}

const findProduct = (query) => {
    return new Promise((resolve, reject) => {
        const { product_name, order, sort } = query
        let sqlQuery = "select * from products where lower(product_name) like lower('%' || $1 || '%')"
        if (sort) {
            sqlQuery += " order by " + sort + " " + order
        }
        db.query(sqlQuery, [product_name])
            .then((result) => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "User Not Found" })
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

const createNewProduct = (body) => {
    return new Promise((resolve, reject) => {
        const { product_name, product_price, product_size, product_description, product_pict} = body;
        const sqlQuery = "INSERT INTO products(product_name, product_price, product_size, product_description, product_pict) VALUES($1, $2, $3, $4, $5) RETURNING *"
        db.query(sqlQuery, [product_name, product_price, product_size, product_description, product_pict])
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

const updateProduct = (product_id, body) => {
    return new Promise((resolve, reject) => {
        const { product_name, product_price, product_size, product_description, product_pict } = body
        const sqlQuery = "UPDATE products SET product_name=$1, product_price=$2, product_size=$3, product_description=$4, product_pict=$5 WHERE product_id=$6 returning *;"
        db.query(sqlQuery, [product_name, product_price, product_size, product_description, product_pict, product_id])
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

const deleteProduct = (product_id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "DELETE FROM products WHERE product_id = $1 RETURNING *"
        db.query(sqlQuery, [product_id])
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
    getProductsFromServer,
    getSingleProductsFromServer,
    findProduct,
    createNewProduct,
    updateProduct,
    deleteProduct
}