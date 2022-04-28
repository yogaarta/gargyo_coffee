const db = require("../config/db");

const getUsersFromServer = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users")
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

const getSingleUserFromServer = (id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "select * from users where user_id = $1";
        db.query(sqlQuery, [id])
            .then((result) => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "User Not Found" });
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

const findUser = (query) => {
    return new Promise((resolve, reject) => {
        const { user_email, order, sort } = query;
        let sqlQuery = "select * from users where lower(user_email) like lower('%' || $1 || '%')";
        if (sort) {
            sqlQuery += " order by " + sort + " " + order;
        }
        db.query(sqlQuery, [user_email])
            .then((result) => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "User Not Found" });
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

const createNewUser = (body) => {
    return new Promise((resolve, reject) => {
        const { user_email, user_pass, user_mobile_number } = body;
        const sqlQuery = "INSERT INTO users(user_email, user_pass, user_mobile_number) VALUES($1, $2, $3) RETURNING *";
        db.query(sqlQuery, [user_email, user_pass, user_mobile_number])
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

const updateUser = (user_id, body) => {
    return new Promise((resolve, reject) => {
        const { user_email, user_pass, user_mobile_number, user_display_name, first_name, last_name } = body;
        const sqlQuery = "UPDATE users SET user_email=$1, user_pass=$2, user_mobile_number=$3, user_display_name=$4, first_name=$5, last_name=$6 WHERE user_id=$7 returning *;";
        db.query(sqlQuery, [user_email, user_pass, user_mobile_number, user_display_name, first_name, last_name, user_id])
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

const deleteUser = (user_id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "DELETE FROM users WHERE user_id = $1 RETURNING *";
        db.query(sqlQuery, [user_id])
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
    getSingleUserFromServer,
    getUsersFromServer,
    findUser,
    createNewUser,
    updateUser,
    deleteUser
};