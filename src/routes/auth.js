const Router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const authController = require("../controllers/auth");
const validate = require("../middlewares/validate");

// register
Router.post("/new", validate.bodyLoginUser, authMiddleware.checkDuplicate, authController.register);

// sign in
Router.post("/", validate.bodyLoginUser, authController.logIn);

// forgot pass
Router.get("/forgot/:email", authController.forgotPass);

// reset pass
Router.patch("/reset/:email", authMiddleware.checkResetPass, authController.resetPass);

// sign out
Router.delete("/", (req, res) => {
    res.json({
        msg: "Berhasil Sign Out"
    });
 });

 module.exports = Router;