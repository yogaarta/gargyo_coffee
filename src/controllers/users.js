const usersModel = require("../models/users")
const {getUsersFromServer, getSingleUserFromServer} = usersModel

const getAllUsers = (req, res) => {
    getUsersFromServer()
        .then(result => {
            const { total, data} = result
            res.status(200).json({
                data,
                total,
                err: null
            })
        })
        .catch(error => {
            const {err, status} = error
            res.status(status).json({
                err: err.message,
                data: []
            })
        })
}

const getSingleUser = (req, res) => {
    getSingleUserFromServer(1)
        .then(result => {
            res.status(200).json({
                data: result,
                err: null
            })
        }).catch(error => {
            const {err, status} = error
            res.status(status).json({
                err: err.message,
                data: []
            })
        })
}

module.exports = {
    getAllUsers,
    getSingleUser
}