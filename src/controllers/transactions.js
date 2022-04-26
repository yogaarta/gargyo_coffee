const transactionsModel = require("../models/transactions")
const { getTransactionsFromServer, createNewTransaction, findTransactionsByDate } = transactionsModel

const getAllTransactions = (req, res) => {
    getTransactionsFromServer()
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

const findTransactions = (req, res) => {
    findTransactionsByDate(req.query)
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

const createTransaction = (req, res) => {
    createNewTransaction(req.body)
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


module.exports = {
    getAllTransactions,
    createTransaction,
    findTransactions
}