const db = require("../config/db");

const getUsersFromServer = (query) => {
    return new Promise((resolve, reject) => {
        const { email, order = "asc", sort = "created_at", page = 1, limit = 3 } = query;
        let offset = (Number(page) - 1) * Number(limit);
        const totalParam = [];
        const parameter = [];
        let totalQuery = "SELECT COUNT(id) as total_users from users";
        let sqlQuery = "select id, email, mobile_number, display_name, first_name, last_name, profile_picture from users";
        if(email){
            totalQuery += " where lower(email) like lower('%' || $1 || '%')";
            sqlQuery += " where lower(email) like lower('%' || $1 || '%')";
            totalParam.push(email);
            parameter.push(email);
        }
        if (sort) {
            sqlQuery += " order by " + sort + " " + order;
        }
        sqlQuery += ` LIMIT $${parameter.length + 1} OFFSET $${parameter.length + 2}`;
        parameter.push(Number(limit), offset);
        db.query(sqlQuery, parameter)
            .then(result => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "Users Not Found" });
                }
                const response = {
                    total: result.rowCount,
                    data: result.rows
                };
                db.query(totalQuery, totalParam)
                .then((result) => {
                    response.totalData = Number(result.rows[0]["total_users"]);
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

const getSingleUserFromServer = (id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "select id, email, mobile_number, display_name, first_name, last_name, address, birthday, gender, profile_picture, roles from users where id = $1";
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

const updateUser2 = (id, file, body) => {
    return new Promise((resolve, reject) => {
        const profile_picture = file ? file.path.replace("public", "").replace(/\\/g, "/") : null;
        const { email, pass, mobile_number, display_name, first_name, last_name, address, birthday, gender } = body;
        const updated_at = new Date(Date.now());
        const sqlQuery = "UPDATE users SET email=COALESCE(NULLIF($1, ''), email), pass=COALESCE(NULLIF($2, ''), pass), mobile_number=COALESCE(NULLIF($3, ''), mobile_number), display_name=COALESCE(NULLIF($4, ''), display_name), first_name=COALESCE(NULLIF($5, ''), first_name), last_name=COALESCE(NULLIF($6, ''), last_name), address=COALESCE(NULLIF($7, ''), address), birthday=COALESCE(NULLIF($8, '')::date, birthday), gender=COALESCE(NULLIF($9, ''), gender), profile_picture=COALESCE($10, profile_picture), updated_at = $11 WHERE id=$12 returning *;";
        db.query(sqlQuery, [email, pass, mobile_number, display_name, first_name, last_name, address, birthday, gender, profile_picture, updated_at, id])
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
    createNewUser,
    updateUser2,
    deleteUser
};