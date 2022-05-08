const db = require("../config/db");

const getTransactionsFromServer = (query) => {
    return new Promise((resolve, reject) => {
        const { user_id } = query;
        let sqlQuery = "select * from transactions";
        if(user_id){
            sqlQuery += " where user_id = '" + user_id +"'";
        }
        db.query(sqlQuery)
            .then(result => {
                const response = {
                    total: result.rowCount,
                    data: result.rows
                };
                resolve(response);
            })
            .catch(err => {
                reject({ status: 500, err });
            });
    });
};

const findTransactionsByDate = (query) => {
    return new Promise((resolve, reject) => {
        const { start_date, end_date } = query;
        let sqlQuery = "select * from transactions where time >= '" + start_date + "' and time <= '" + end_date + "'";
        db.query(sqlQuery)
            .then((result) => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "Transactions Not Found" });
                }
                const response = {
                    total: result.rowCount,
                    data: result.rows
                };
                resolve(response);
            })
            .catch((err) => {
                reject({ status: 500, err });
            });
    });
};

const createNewTransaction = (body) => {
    return new Promise((resolve, reject) => {
        const { product_id, total_price, quantity, user_id, time } = body;
        const sqlQuery = "INSERT INTO transactions(product_id, total_price, quantity, user_id, time) VALUES($1, $2, $3, $4, $5) RETURNING *";
        db.query(sqlQuery, [product_id, total_price, quantity, user_id, time])
            .then(result => {
                const response = {
                    data: result.rows[0]
                };
                resolve(response);
            })
            .catch(err => {
                reject({ status: 500, err });
            });
    });
};

module.exports = {
    getTransactionsFromServer,
    createNewTransaction,
    findTransactionsByDate
};