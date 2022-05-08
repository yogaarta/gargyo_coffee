const db = require("../config/db");

const getPromosFromServer = () => {
    return new Promise((resolve, reject) => {
        db.query("select * from promos")
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

const findPromo = (query) => {
    return new Promise((resolve, reject) => {
        const { code, order, sort } = query;
        let sqlQuery = "select * from promos where lower(code) like lower('%' || $1 || '%')";
        if (sort) {
            sqlQuery += " order by " + sort + " " + order;
        }
        db.query(sqlQuery, [code])
            .then((result) => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "Promos Not Found" });
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

const createNewPromo = (body) => {
    return new Promise((resolve, reject) => {
        const { product_id, start_date, end_date, code, discount } = body;
        const sqlQuery = "INSERT INTO promos(product_id, start_date, end_date, code, discount) VALUES($1, $2, $3, $4, $5) RETURNING *";
        db.query(sqlQuery, [product_id, start_date, end_date, code, discount])
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

const updatePromo = (id, body) => {
    return new Promise((resolve, reject) => {
        const { product_id, start_date, end_date, code, discount } = body;
        const sqlQuery = "UPDATE promos SET product_id=COALESCE(NULLIF($1, '')::integer, product_id), start_date=COALESCE(NULLIF($2, '')::date, start_date), end_date=COALESCE(NULLIF($3, '')::date, end_date), code=COALESCE(NULLIF($4, ''), code), discount=COALESCE(NULLIF($5, '')::integer, discount) WHERE id=$6 returning *;";
        db.query(sqlQuery, [product_id, start_date, end_date, code, discount, id])
            .then(result => {
                const response = {
                    data: result.rows
                };
                resolve(response);
            })
            .catch(err => {
                reject({ status: 500, err });
            });
    });
};

const deletePromo = (id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "DELETE FROM promos WHERE id = $1 RETURNING *";
        db.query(sqlQuery, [id])
            .then(result => {
                const response = {
                    data: result.rows
                };
                resolve(response);
            })
            .catch(err => {
                reject({ status: 500, err });
            });
    });
};

module.exports = {
    getPromosFromServer,
    findPromo,
    createNewPromo,
    updatePromo,
    deletePromo
};