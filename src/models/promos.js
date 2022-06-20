const db = require("../config/db");
const { v4: uuidV4 } = require("uuid");

const getPromosFromServer = () => {
    return new Promise((resolve, reject) => {
        db.query("select id, name, normal_price, description, category_id, picture, code, discount, to_char(start_date, 'YYYY-MM-DD') as start_date, to_char(end_date, 'YYYY-MM-DD') as end_date from promos")
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

const getPromosById = (id) => {
    return new Promise((resolve, reject) => {
        db.query("select id, name, normal_price, description, category_id, picture, code, discount, to_char(start_date, 'YYYY-MM-DD') as start_date, to_char(end_date, 'YYYY-MM-DD') as end_date from promos WHERE id = $1", [id])
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

const getPromoByDate = (query) => {
    return new Promise((resolve, reject) => {
        const {page = 1, limit = 4} = query;
        let offset = (Number(page) - 1) * Number(limit);
        let totalQuery = "SELECT COUNT(id) AS total_promos FROM promos WHERE start_date <= now() AND end_date >= now()"; 
        let sqlQuery = "SELECT * FROM promos WHERE start_date <= now() AND end_date >= now() LIMIT $1 OFFSET $2";
        db.query(sqlQuery, [Number(limit), offset])
            .then(result => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "Promos Not Found" });
                }
                const response = {
                    total: result.rowCount,
                    data: result.rows
                };
                resolve(response);
                db.query(totalQuery)
                    .then((result) => {
                        response.totalData = Number(result.rows[0]["total_promos"]);
                        response.totalPage = Math.ceil(response.totalData / Number(limit));
                        resolve(response);
                    })
                    .catch(err => {
                        reject({ status: 500, err });
                    });
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

const createNewPromo = (body, file) => {
    return new Promise((resolve, reject) => {
        const { product_id, start_date, end_date, code, discount, name, normal_price, description, category_id } = body;
        const id = uuidV4();
        const picture = file.path;
        const sqlQuery = "INSERT INTO promos(id, product_id, start_date, end_date, code, discount, name, normal_price, description, category_id, picture) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *";
        db.query(sqlQuery, [id, product_id, start_date, end_date, code, discount, name, normal_price, description, category_id, picture])
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

const updatePromo = (id, body, file) => {
    return new Promise((resolve, reject) => {
        const { product_id, start_date, end_date, code, discount, name, normal_price, description, category_id } = body;
        const picture = file ? file.path : null;
        const sqlQuery = "UPDATE promos SET product_id=COALESCE(NULLIF($1, '')::integer, product_id), start_date=COALESCE(NULLIF($2, '')::date, start_date), end_date=COALESCE(NULLIF($3, '')::date, end_date), code=COALESCE(NULLIF($4, ''), code), discount=COALESCE(NULLIF($5, '')::integer, discount), name=COALESCE(NULLIF($6, ''), name), normal_price=COALESCE(NULLIF($7, '')::integer, normal_price), description=COALESCE(NULLIF($8, ''), description), category_id=COALESCE(NULLIF($9, ''), category_id), picture=COALESCE(NULLIF($10, ''), picture) WHERE id=$11 returning *;";
        db.query(sqlQuery, [product_id, start_date, end_date, code, discount, name, normal_price, description, category_id, picture, id])
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
    getPromoByDate,
    getPromosById,
    findPromo,
    createNewPromo,
    updatePromo,
    deletePromo
};