const { v4: uuidV4 } = require("uuid");
const db = require("../config/db");

const getProductsFromServer = (query) => {
    return new Promise((resolve, reject) => {
        const { name, category, sort = "category_id", order = "asc", page = 1, limit = 3 } = query;
        let offset = (Number(page) - 1) * Number(limit);
        let parameterize = [];
        let sqlQuery = "select products.id, products.name, products.price, products.picture, products.created_at from products join product_category on products.category_id = product_category.id";
        if (!name && !category) {
            sqlQuery += " order by " + sort + " " + order + " LIMIT $1 OFFSET $2";
            parameterize.push(Number(limit), offset);
        }
        if (name && !category) {
            sqlQuery += " where lower(products.name) like lower('%' || $1 || '%') order by " + sort + " " + order + " LIMIT $2 OFFSET $3";
            parameterize.push(name, Number(limit), offset);
        }
        if (category && !name) {
            sqlQuery += " where product_category.name = $1 order by " + sort + " " + order + " LIMIT $2 OFFSET $3";
            parameterize.push(category, Number(limit), offset);
        }
        if (name && category) {
            sqlQuery += " where product_category.name = $2 AND lower(products.name) like lower('%' || $1 || '%') order by " + sort + " " + order + " LIMIT $3 OFFSET $4";
            parameterize.push(name, category, Number(limit), offset);
        }
        db.query(sqlQuery, parameterize)
            .then(result => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "Products Not Found" });
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

const getFavoriteProducts = () => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "select p.name, p.price, p.pict from transactions t join products p on p.id = t.id group by p.name, p.price, p.pict order by count(*) desc;";
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

const getSingleProductsFromServer = (id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "select * from products where id = $1";
        db.query(sqlQuery, [id])
            .then((result) => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "Product Not Found" });
                }
                const response = {
                    data: result.rows
                };
                resolve(response);
            })
            .catch((err) => {
                reject({ status: 500, err });
            });
    });
};

const findProduct = (query) => {
    return new Promise((resolve, reject) => {
        const { name, order, sort } = query;
        let sqlQuery = "select * from products where lower(name) like lower('%' || $1 || '%')";
        if (sort) {
            sqlQuery += " order by " + sort + " " + order;
        }
        db.query(sqlQuery, [name])
            .then((result) => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "Products Not Found" });
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

const createNewProduct = (body, file) => {
    return new Promise((resolve, reject) => {
        const { name, price, size, description, category_id } = body;
        const id = uuidV4();
        const created_at = new Date(Date.now());
        const picture = file.path.replace("public", "").replace(/\\/g, "/");
        const sqlQuery = "INSERT INTO products(id, name, price, size, description, picture, category_id, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, name, price, size, description, picture, category_id, created_at";
        db.query(sqlQuery, [id, name, price, size, description, picture, category_id, created_at])
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

const updateProduct = (id, body) => {
    return new Promise((resolve, reject) => {
        const { name, price, size, description, picture } = body;
        const updated_at = new Date(Date.now());
        const sqlQuery = "UPDATE products SET name = COALESCE(NULLIF($1, ''), name), price = COALESCE(NULLIF($2, '')::integer, price), size = COALESCE(NULLIF($3, ''), size), description = COALESCE(NULLIF($4, ''), description), picture = COALESCE(NULLIF($5, ''), picture), updated_at = $6 WHERE id = $7 returning *";
        db.query(sqlQuery, [name, price, size, description, picture, updated_at, id])
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

const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "DELETE FROM products WHERE id = $1 RETURNING *";
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
    getProductsFromServer,
    getFavoriteProducts,
    getSingleProductsFromServer,
    findProduct,
    createNewProduct,
    updateProduct,
    deleteProduct
};