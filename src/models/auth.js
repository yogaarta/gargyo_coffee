const { v4: uuidV4 } = require("uuid");
const db = require("../config/db");

const register = (email, hashedPassword) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "INSERT INTO users(id, email, pass, created_at) VALUES ($1, $2, $3, $4)";
        const id = uuidV4();
        const timestamp = new Date(Date.now());
        const parameterize = [id, email, hashedPassword, timestamp];
        db.query(sqlQuery, parameterize)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject({ status: 500, err });
            });
    });
};

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT email FROM users WHERE email = $1";
        db.query(sqlQuery, [email]).then(result => {
            resolve(result);
        }).catch(err => {
            reject({ status: 500, err });
        });
    });
};

const getPassByUserEmail = async (email) => {
    try {
        const sqlQuery = "SELECT id, pass FROM users WHERE email = $1";
        const result = await db.query(sqlQuery, [email]);
        // cek apakah ada pass
        if (result.rowCount === 0)
            throw { status: 400, err: { msg: "Email is not registered" } };
        return result.rows[0];
    } catch (error) {
        const { status = 500, err } = error;
        throw { status, err};
    }
};


module.exports = { register, getUserByEmail, getPassByUserEmail };