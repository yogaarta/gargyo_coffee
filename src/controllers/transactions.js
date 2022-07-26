const transactionsModel = require("../models/transactions");
const {
    getTransactionsFromServer,
    createNewTransaction,
    findTransactionsByDate,
    getTransactionDetailModel,
    getTransactionByUserId,
    deleteUserTransactions,
    getDailyProfit
} = transactionsModel;
const { messaging } = require("../config/firebase")
const notif = messaging()

const getAllTransactions = (req, res) => {
    getTransactionsFromServer(req.query)
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

const findTransactions = (req, res) => {
    findTransactionsByDate(req.query)
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

const getTransactionDetail = (req, res) => {
    const { id } = req.params;
    getTransactionDetailModel(id)
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
const getTransactionByUserIdControl = (req, res) => {
    const { id } = req.userPayload;
    getTransactionByUserId(id)
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

// const createTransaction = (req, res) => {
//     createNewTransaction(req.body)
//         .then(result => {
//             const { data } = result;
//             res.status(200).json({
//                 err: null,
//                 data,
//             });
//         })
//         .catch(error => {
//             const { status, err } = error;
//             res.status(status).json({
//                 data: [],
//                 err
//             });
//         });
// };

const createTransaction = async (req, res) => {
    try {
        const { body } = req
        const msg = {
            token: body.receiver,
            notification: {
                body: body.message,
                title: body.title
            }
        }
        const result = await createNewTransaction(req.body)
        const { data } = result
        await notif.send(msg);
        return res.status(200).json({
            err: null,
            data,
        });
    } catch (error) {
        const { status, err } = error;
        res.status(status).json({
            data: [],
            err
        });
    }
}

const deleteUserTransactionsControl = (req, res) => {
    deleteUserTransactions(req.body)
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

const getDailyProfitControl = (req, res) => {
    getDailyProfit()
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
    getAllTransactions,
    createTransaction,
    findTransactions,
    getTransactionDetail,
    getTransactionByUserIdControl,
    deleteUserTransactionsControl,
    getDailyProfitControl
};