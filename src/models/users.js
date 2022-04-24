const db = require("../config/db")

const users = [
    {
        id: 1,
        email: "yoga@mail.com",
        pass: "lalayo",
        mobilePhone: 08123456
    },
    {
        id: 2,
        email: "arta@mail.com",
        pass: "yapayo",
        mobilePhone: 08987654
    },
    {
        id: 3,
        email: "graha@mail.com",
        pass: "malayo",
        mobilePhone: 088997766
    },
]

const getUsersFromServer = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users")
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

const getSingleUserFromServer = (id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "select * from users where id = $1"
        db.query(sqlQuery, [id])
            .then((result) => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "User Not Found" })
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

const findUserFromServer = (query) => {
    return new Promise((resolve, reject) => {
        const email = query.email
        const sqlQuery = "select * from users where lower(email) like lower('%' || $1 || '%')"
        db.query(sqlQuery, [email])
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
module.exports = {
    getSingleUserFromServer,
    getUsersFromServer,
    findUserFromServer
}