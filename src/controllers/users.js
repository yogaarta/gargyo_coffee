const usersModel = require("../models/users");
const { getUsersFromServer, getSingleUserFromServer, findUser, createNewUser, updateUser, deleteUser } = usersModel;

const getAllUsers = (req, res) => {
    getUsersFromServer()
        .then(result => {
            const { total, data } = result;
            res.status(200).json({
                data,
                total,
                err: null
            });
        })
        .catch(error => {
            const { err, status } = error;
            res.status(status).json({
                data: [],
                err
            });
        });
};

const getUserById = (req, res) => {
    const { user_id } = req.params;
    getSingleUserFromServer(user_id)
        .then((result) => {
            const { data } = result;
            res.status(200).json({
                data,
                err: null
            });
        }).catch(error => {
            const { err, status } = error;
            res.status(status).json({
                err,
                data: []
            });
        });
};

const findUserByQuery = (req, res) => {
    findUser(req.query)
        .then(result => {
            const { data, total } = result;
            res.status(200).json({
                data,
                total,
                err: null
            });
        })
        .catch(error => {
            const { status, err } = error;
            res.status(status).json({
                data: [],
                err
            });
        });

};

const postUser = (req, res) => {
    createNewUser(req.body)
        .then(result => {
            const { data } = result;
            res.status(200).json({
                err: null,
                data,
            });
        })
        .catch(error => {
            const { status, err } = error;
            res.status(status).json({
                data: [],
                err
            });
        });
};

const putUser = (req, res) => {
    const { user_id } = req.params;
    updateUser(user_id, req.body)
        .then(result => {
            const { data } = result;
            res.status(200).json({
                err: null,
                data
            });
        })
        .catch(error => {
            const { status, err } = error;
            res.status(status).json({
                data: [],
                err
            });
        });
};

const deleteUserById = (req, res) => {
    const { user_id } = req.params;
    deleteUser(user_id)
        .then((result) => {
            const { data } = result;
            res.status(200).json({
                data,
                err: null
            });
        })
        .catch(error => {
            const { err, status } = error;
            res.status(status).json({
                err,
                data: []
            });
        });
};

module.exports = {
    getAllUsers,
    getUserById,
    findUserByQuery,
    postUser,
    putUser,
    deleteUserById
};