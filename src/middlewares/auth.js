const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../models/auth");

const checkDuplicate = (req, res, next) => {
    getUserByEmail(req.body.email).then((result) => {
        if (result.rowCount > 0)
            return res.status(400).json({
                msg: "Email already used",
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
                    err: { msg: "Need to Re Log In" },
                    data: []
                });
            req.userPayload = payload;
            next();
        });
};

module.exports = { checkDuplicate, checkToken };