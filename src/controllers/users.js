const usersModel = require("../models/users")
const { getUsersFromServer, getSingleUserFromServer, findUserFromServer } = usersModel

const getAllUsers = (req, res) => {
    getUsersFromServer()
        .then(result => {
            const { total, data } = result
            res.status(200).json({
                data,
                total,
                err: null
            })
        })
        .catch(error => {
            const { err, status } = error
            res.status(status).json({
                data: [],
                err
            })
        })
}

const getUserById = (req, res) => {
    const id = req.params.id
    getSingleUserFromServer(id)
        .then((result) => {
            const { data } = result
            res.status(200).json({
                data,
                err: null
            })
        }).catch(error => {
            const { err, status } = error
            res.status(status).json({
                err,
                data: []
            })
        })
}

const findUserByQuery = (req, res) => {
    findUserFromServer(req.query)
        .then(result => {
            const { data, total } = result
            res.status(200).json({
                data,
                total,
                err: null
            })
        })
        .catch(error => {
            const { status, err } = error
            res.status(status).json({
                data: [],
                err
            })
        })

}

module.exports = {
    getAllUsers,
    getUserById,
    findUserByQuery
}