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
        // let err = false
        // if (err) {
        //     return reject({
        //         err: new Error(err),
        //         status: 500
        //     })
        // }
        // return resolve(users)
        db.query("SELECT * FROM users")
            .then(result => {
                const response = {
                    total: result.rowCount,
                    data: result.rows
                }
                resolve(response)
            })
            .catch(err =>{
                reject({status: 500, err})
            })
    })
}

const getSingleUserFromServer = (id) => {
    return new Promise((resolve, reject) => {
        let err = false
        const user = users.filter(user => user.id === id)
        if (err) {
            return reject({
                err: new Error(err),
                status: 500
            })
        }
        if (user.length === 0) {
            return reject({
                err: new Error("User Not Found"),
                status: 404
            })
        }
        return resolve(user)
    })
}

module.exports = {
    getSingleUserFromServer,
    getUsersFromServer
}