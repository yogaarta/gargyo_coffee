const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { register, getPassByUserEmail } = require("../models/auth");

const auth = {};

auth.register = (req, res) => {
    // expect body dengan property email dan pass
    const { email, pass } = req.body;
    bcrypt.hash(pass, 10)
        .then((hashedPassword) => {
            register(email, hashedPassword)
                .then(() => {
                    res.status(201).json({
                        data: { msg: "Register Success" },
                        err: null
                    });
                }).catch(error => {
                    const { status, err } = error;
                    res.status(status).json({
                        data: [],
                        err
                    });
                });
        })
        .catch((err) => {
            res.status(500).json({
                err,
                data: [],
            });
        });
};

auth.logIn = async (req, res) => {
    try {
        const { email, pass } = req.body;
        const data = await getPassByUserEmail(email);
        const result = await bcrypt.compare(pass, data.pass);
        if(!result)
        return res.status(400).json({
            err: {msg: "Wrong Email or Pass!"},
            data: []
        });
        // generate jwt
        const payload = {
            id: data.id,
            email,
            roles: data.roles
        };
        const jwtOption = {
            issuer: process.env.JWT_ISSUER,
            expiresIn: "1000s"
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, jwtOption);
        res.status(200).json({
            data: {email, token},
            err: null
        });
    } catch (error){
        const { status, err } = error;
        res.status(status).json({
            err,
            data: []
        });
    }
};

module.exports = auth;