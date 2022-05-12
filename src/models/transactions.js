const db = require("../config/db");
const { v4: uuidV4 } = require("uuid");

const getTransactionsFromServer = (query) => {
    return new Promise((resolve, reject) => {
        const { user_id, start_date, end_date } = query;
        let parameterize = [];
        let sqlQuery = "SELECT t.id, p.name , total_price, quantity, u.email , time FROM transactions t join products p on p.id = t.product_id join users u on u.id = t.user_id";
        if(user_id && !start_date){
            sqlQuery += " where user_id = $1";
            parameterize.push(user_id);
        }
        if(start_date && !user_id){
            sqlQuery +=  " where time >= $1 and time <= $2";
            parameterize.push(start_date, end_date);
        }
        if(user_id && start_date){
            sqlQuery += " where user_id = $1 AND time >= $2 AND time <= $3";
            parameterize.push(user_id, start_date, end_date);
        }
        db.query(sqlQuery, parameterize)
            .then(result => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "Transactions Not Found" });
                }
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
        const { product_id, total_price, quantity, user_id } = body;
        const id = uuidV4();
        const time = new Date(Date.now());
        const sqlQuery = "INSERT INTO transactions(id, product_id, total_price, quantity, user_id, time) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
        db.query(sqlQuery, [id, product_id, total_price, quantity, user_id, time])
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