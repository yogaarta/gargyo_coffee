const db = require("../config/db");

const getUsersFromServer = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT id, email, mobile_number, display_name FROM users")
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
        const sqlQuery = "select id, email, mobile_number, display_name, first_name, last_name from users where id = $1";
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
        const { email, order, sort } = query;
        let sqlQuery = "select id, email, mobile_number, display_name, first_name, last_name from users where lower(email) like lower('%' || $1 || '%')";
        if (sort) {
            sqlQuery += " order by " + sort + " " + order;
        }
        db.query(sqlQuery, [email])
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
        const { email, pass, mobile_number } = body;
        const sqlQuery = "INSERT INTO users(email, pass, mobile_number) VALUES($1, $2, $3) RETURNING *";
        db.query(sqlQuery, [email, pass, mobile_number])
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

const updateUser = (id, body) => {
    return new Promise((resolve, reject) => {
        const { email, pass, mobile_number, display_name, first_name, last_name } = body;
        const sqlQuery = "UPDATE users SET email=COALESCE(NULLIF($1, ''), email), pass=COALESCE(NULLIF($2, ''), pass), mobile_number=COALESCE(NULLIF($3, '')::integer, mobile_number), display_name=COALESCE(NULLIF($4, ''), display_name), first_name=COALESCE(NULLIF($5, ''), first_name), last_name=COALESCE(NULLIF($6, ''), last_name) WHERE id=$7 returning *";
        db.query(sqlQuery, [email, pass, mobile_number, display_name, first_name, last_name, id])
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

const updateUser2 = (id, file, body) => {
    return new Promise((resolve, reject) => {
        // const id = req.userPayload.id;
        // const { file = null } = req;
        const profile_picture = file.path.replace("public", "").replace(/\\/g, "/");
        const { email, pass, mobile_number, display_name, first_name, last_name } = body;
        const updated_at = new Date(Date.now());
        // console.log(req);
        // const { email, pass, mobile_number, display_name, first_name, last_name } = req.body;
        const sqlQuery = "UPDATE users SET email=COALESCE($1, email), pass=COALESCE($2, pass), mobile_number=COALESCE($3, mobile_number), display_name=COALESCE($4, display_name), first_name=COALESCE($5, first_name), last_name=COALESCE($6, last_name), profile_picture=COALESCE($7, profile_picture), updated_at = $8 WHERE id=$9 returning *;";
        db.query(sqlQuery, [email, pass, mobile_number, display_name, first_name, last_name, profile_picture, updated_at, id])
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

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "DELETE FROM users WHERE id = $1 RETURNING *";
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
    getSingleUserFromServer,
    getUsersFromServer,
    findUser,
    createNewUser,
    updateUser,
    updateUser2,
    deleteUser
};