const usersModel = require("../models/users");
const { getUsersFromServer, getSingleUserFromServer, createNewUser, updateUser2, deleteUser } = usersModel;

const getAllUsers = (req, res) => {
    getUsersFromServer(req.query)
        .then(result => {
            const { data, totalData, totalPage } = result;
            const { email, sort, order, page = 1, limit } = req.query;
            let nextPage = "/users?";
            let prevPage = "/users?";
            if(email){
                nextPage += `email=${email}`;
                prevPage += `email=${email}`;
            }
            if (sort) {
                nextPage += `sort=${sort}&`;
                prevPage += `sort=${sort}&`;
            }
            if (order) {
                nextPage += `order=${order}&`;
                prevPage += `order=${order}&`;
            }
            if (limit) {
                nextPage += `limit=${limit}&`;
                prevPage += `limit=${limit}&`;
            }
            nextPage += `page=${Number(page) + 1}`;
            prevPage += `page=${Number(page) - 1}`;
            const meta = {
                totalData,
                totalPage,
                currentPage: Number(page),
                nextPage: Number(page) === totalPage ? null : nextPage,
                prevPage: Number(page) === 1 ? null : prevPage
            };
            res.status(200).json({
                data,
                meta,
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
    const id = req.userPayload.id;
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

const patchUser = (req, res) => {
    const id = req.userPayload.id;
    const { file = null } = req;
    updateUser2(id, file, req.body)
        .then(result => {
            const { data } = result;
            res.status(200).json({
                msg: "Update Success",
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
    postUser,
    patchUser,
    deleteUserById
};