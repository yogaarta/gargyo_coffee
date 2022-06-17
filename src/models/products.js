const { v4: uuidV4 } = require("uuid");
const db = require("../config/db");

const getProductsFromServer = (query) => {
    return new Promise((resolve, reject) => {
        const { name, category, sort = "category_id", order = "asc", page = 1, limit = 12 } = query;
        let offset = (Number(page) - 1) * Number(limit);
        let parameterize = [];
        let totalParam = [];
        let totalQuery = "select count(products.id) as total_products from products join product_category on products.category_id = product_category.id";
        let sqlQuery = "select products.id, products.name, products.price, products.picture, product_category.name as category, products.created_at from products join product_category on products.category_id = product_category.id";
        if (!name && !category) {
            sqlQuery += " order by " + sort + " " + order + " LIMIT $1 OFFSET $2";
            parameterize.push(Number(limit), offset);
        }
        if (name && !category) {
            sqlQuery += " where lower(products.name) like lower('%' || $1 || '%') order by " + sort + " " + order + " LIMIT $2 OFFSET $3";
            totalQuery += " where lower(products.name) like lower('%' || $1 || '%')";
            parameterize.push(name, Number(limit), offset);
            totalParam.push(name);
        }
        if (category && !name) {
            sqlQuery += " where product_category.name = $1 order by " + sort + " " + order + " LIMIT $2 OFFSET $3";
            totalQuery += " where product_category.name = $1";
            parameterize.push(category, Number(limit), offset);
            totalParam.push(category);
        }
        if (name && category) {
            sqlQuery += " where product_category.name = $2 AND lower(products.name) like lower('%' || $1 || '%') order by " + sort + " " + order + " LIMIT $3 OFFSET $4";
            totalQuery += " where product_category.name = $2 AND lower(products.name) like lower('%' || $1 || '%')";
            parameterize.push(name, category, Number(limit), offset);
            totalParam.push(name, category);
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
                db.query(totalQuery, totalParam)
                    .then((result) => {
                        response.totalData = Number(result.rows[0]["total_products"]);
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

const getFavoriteProducts = () => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "select p.id, p.name, p.price, p.picture, p.created_at from products p join product_category pc on p.category_id = pc.id join transactions t on p.id = t.product_id group by p.id, p.name, p.price, p.picture, p.created_at order by count(*) desc";
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
        const sqlQuery = "select p.id, p.name, p.price, p.picture, p.description, p.created_at, pc.name as category from products p join product_category pc on p.category_id = pc.id where p.id = $1";
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

const createNewProduct = (body, file) => {
    return new Promise((resolve, reject) => {
        const { name, price, size, description, category_id } = body;
        const id = uuidV4();
        const created_at = new Date(Date.now());
        // const picture = file.path.replace("public", "").replace(/\\/g, "/");
        const picture = file.path;
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

const patchProductModel = (id, body, file) => {
    return new Promise((resolve, reject) => {
        const { name, price, size, description, category_id } = body;
        // const picture = file ? file.path.replace("public", "").replace(/\\/g, "/") : null;
        const picture = file ? file.path : null;
        const updated_at = new Date(Date.now());
        const sqlQuery = "UPDATE products SET name = COALESCE(NULLIF($1, ''), name), price = COALESCE(NULLIF($2, '')::integer, price), size = COALESCE(NULLIF($3, ''), size), description = COALESCE(NULLIF($4, ''), description), category_id = COALESCE(NULLIF($5, '')::integer, category_id),picture = COALESCE($6, picture), updated_at = $7 WHERE id = $8 returning *";
        db.query(sqlQuery, [name, price, size, description, category_id, picture, updated_at, id])
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
                    msg: "Product Deleted",
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
    createNewProduct,
    patchProductModel,
    deleteProduct
};