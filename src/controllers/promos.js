const promosModel = require("../models/promos");
const { getPromosFromServer, findPromo, createNewPromo, updatePromo, deletePromo, getPromoByDate, getPromosById } = promosModel;

const getAllPromos = (req, res) => {
    getPromosFromServer()
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
const getPromoByIdControl = (req, res) => {
    const { id } = req.params;
    getPromosById(id)
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

const findPromoByQuery = (req, res) => {
    findPromo(req.query)
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

const getPromoByDateControl = (req, res) => {
    getPromoByDate(req.query)
        .then(result => {
            const { data, totalData, totalPage } = result;
            const { page = 1, limit } = req.query;
            let nextPage = "/promos/today?";
            let prevPage = "/promos/today?";
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

const createPromo = (req, res) => {
    const { file = null } = req;
    createNewPromo(req.body, file)
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

const putPromo = (req, res) => {
    const { id } = req.params;
    const { file = null } = req;
    updatePromo(id, req.body, file)
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

const deletePromoById = (req, res) => {
    const { id } = req.params;
    deletePromo(id)
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
    getAllPromos,
    getPromoByIdControl,
    findPromoByQuery,
    getPromoByDateControl,
    createPromo,
    putPromo,
    deletePromoById
};