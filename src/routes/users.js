const Router = require("express").Router();
const usersController = require("../controllers/users");
const validate = require("../middlewares/validate");
const { uploadProfPict } = require("../middlewares/upload");
const { checkToken, adminRole } = require("../middlewares/auth");


Router.get("/", checkToken, adminRole, usersController.getAllUsers);

Router.get("/:id", checkToken, adminRole, usersController.getUserById);

Router.post("/", validate.bodyPostUser, usersController.postUser);

Router.patch("/", checkToken, uploadProfPict, usersController.patchUser);

Router.delete("/:id", usersController.deleteUserById);

module.exports = Router;