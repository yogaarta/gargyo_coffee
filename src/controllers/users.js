const usersModel = require("../models/users");
const { getUsersFromServer, getSingleUserFromServer, findUser, createNewUser, updateUser, updateUser2, deleteUser } = usersModel;

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
    const { id } = req.params;
    getSingleUserFromServer(id)
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
    const { id } = req.params;
    updateUser(id, req.body)
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

const patchUser = (req, res) => {
    const id = req.userPayload.id;
    const { file = null } = req;
    updateUser2(id, file, req.body)
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
    const { id } = req.params;
    deleteUser(id)
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
    patchUser,
    deleteUserById
};