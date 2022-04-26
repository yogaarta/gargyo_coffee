const promosModel = require("../models/promos")
const { getPromosFromServer, findPromo, createNewPromo, updatePromo, deletePromo } = promosModel

const getAllPromos = (req, res) => {
    getPromosFromServer()
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

const findPromoByQuery = (req, res) => {
    findPromo(req.query)
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

const createPromo = (req, res) => {
    createNewPromo(req.body)
        .then(result => {
            const { data } = result
            res.status(200).json({
                err: null,
                data,
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

const putPromo = (req, res) => {
    const { promo_id } = req.params
    updatePromo(promo_id, req.body)
        .then(result => {
            const { data } = result
            res.status(200).json({
                err: null,
                data
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

const deletePromoById = (req, res) => {
    const { promo_id } = req.params
    deletePromo(promo_id)
        .then((result) => {
            const { data } = result
            res.status(200).json({
                data,
                err: null
            })
        })
        .catch(error => {
            const { err, status } = error
            res.status(status).json({
                err,
                data: []
            })
        })
}

module.exports = {
    getAllPromos,
    findPromoByQuery,
    createPromo,
    putPromo,
    deletePromoById
}