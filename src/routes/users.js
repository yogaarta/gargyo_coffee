const Router = require("express").Router();
const usersController = require("../controllers/users");
const authController = require("../controllers/auth");
const validate = require("../middlewares/validate");
const { uploadProfPict } = require("../middlewares/upload");
const { checkToken, adminRole } = require("../middlewares/auth");


Router.get("/all", checkToken, adminRole, usersController.getAllUsers);

Router.get("/", checkToken, usersController.getUserById);

Router.post("/", validate.bodyPostUser, usersController.postUser);

Router.patch("/", checkToken, uploadProfPict, usersController.patchUser);

Router.patch("/changepass", checkToken, usersController.changePass);

Router.delete("/:id", usersController.deleteUserById);

module.exports = Router;