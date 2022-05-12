const Router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const authController = require("../controllers/auth");

// register
Router.post("/new", authMiddleware.checkDuplicate, authController.register);

// sign in
Router.post("/", authController.logIn);

// sign out
Router.delete("/", (req, res) => {
    res.json({
        msg: "Berhasil Sign Out"
    });
 });

 module.exports = Router;