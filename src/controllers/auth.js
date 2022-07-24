const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generator = require("generate-password");
const { client } = require("../config/redis.js");

const { register, getPassByUserEmail, resetPassModel } = require("../models/auth");
const { sendPasswordConfirmation } = require("../config/nodemailer.js");

const auth = {};

auth.register = (req, res) => {
    // expect body dengan property email dan pass
    const { email, pass, mobile_number } = req.body;
    bcrypt.hash(pass, 10)
        .then((hashedPassword) => {
            register(email, hashedPassword, mobile_number)
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

        if (!result)
            return res.status(400).json({
                err: { msg: "Wrong Email or Pass!" },
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
            expiresIn: "100000s"
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, jwtOption);
        res.status(200).json({
            data: { id: data.id, email, token },
            err: null
        });
    } catch (error) {
        const { status, err } = error;
        res.status(status).json({
            err,
            data: []
        });
    }
};

auth.forgotPass = async (req, res) => {
    try {
        const { email } = req.params;
        const confirmCode = generator.generate({
            length: 7,
            numbers: true
        })
        console.log("CONFIRM CODE", confirmCode)
        await sendPasswordConfirmation(email, confirmCode)
        await client.set(`forgotpass-${email}`, confirmCode);
        res.status(200).json({
            message: "Please check your email for confirm code"
        })
    } catch (error) {
        const { message, status } = error;
        res.status(status ? status : 500).json({
            error: message,
        })
    }
}

auth.resetPass = async (req, res) => {
    try {
        const { email } = req.params;
        const { newPass } = req.body;
        const hashedPass = await bcrypt.hash(newPass, 10);
        const { msg } = await resetPassModel(hashedPass, email)
        if(msg){
            await client.del(`forgotpass-${email}`)
            res.status(200).json({
                data: [],
                msg, err: null
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = auth;