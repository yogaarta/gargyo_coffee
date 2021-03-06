const jwt = require("jsonwebtoken");
const { client } = require("../config/redis");
const { getUserByEmail } = require("../models/auth");

const checkDuplicate = (req, res, next) => {
    getUserByEmail(req.body.email).then((result) => {
        if (result.rowCount > 0)
            return res.status(400).json({
                err: { msg: "Email already used" },
                data: []
            });
        next();
    }).catch((error) => {
        const { status, err } = error;
        res.status(status).json({
            data: [],
            err
        });
    });
};

const checkToken = (req, res, next) => {
    const bearerToken = req.header("Authorization");
    // bearer token
    if (!bearerToken) {
        return res.status(401).json({
            err: { msg: "Need to Log In" }
        });
    }
    const token = bearerToken.split(" ")[1];
    // verifikasi token
    jwt.verify(
        token,
        process.env.JWT_SECRET,
        { issuer: process.env.JWT_ISSUER },
        (err, payload) => {
            if (err && err.name === "TokenExpiredError")
                return res.status(401).json({
                    err: { msg: "Need to Re-Login" },
                    data: []
                });
            req.userPayload = payload;
            next();
        });
};

const adminRole = (req, res, next) => {
    const { roles } = req.userPayload;
    if (roles !== "admin") {
        return res.status(401).json({
            err: { msg: "You are not an admin" },
            data: []
        });
    }
    next();
};

const userRole = (req, res, next) => {
    const { roles } = req.userPayload;
    if (roles !== "user") {
        return res.status(401).json({
            err: { msg: "You are not an user" },
            data: []
        });
    }
    next();
};

const checkResetPass = async (req, res, next) => {
    try {
        const { email } = req.params;
        const { confirmCode } = req.body;
        const confirm = await client.get(`forgotpass-${email}`)
        if (!confirm) {
            return res.status(400).json({
                err: { msg: "Code Expired, please make a new request" },
                data: []
            })
        }
        if (confirm !== confirmCode) {
            return res.status(400).json({
                err: { msg: "Invalid Confirmation Code" },
                data: []
            })
        }
        next()
    } catch (error) {
        const status = error.status ? error.status : 500;
        return res.status(status).json({
            err: { msg: error.message },
            data: []
        })
    }
}
module.exports = { checkDuplicate, checkToken, adminRole, userRole, checkResetPass };