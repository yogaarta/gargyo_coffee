const Router = require("express").Router();
const usersController = require("../controllers/users");
const validate = require("../middlewares/validate");
const { imageUpload } = require("../middlewares/upload");
const { checkToken } = require("../middlewares/auth");


Router.get("/all", usersController.getAllUsers);

Router.get("/:id", usersController.getUserById);

Router.get("/", validate.queryFindUser, usersController.findUserByQuery);

Router.post("/", validate.bodyPostUser, usersController.postUser);

Router.patch("/:id", usersController.putUser);

Router.patch("/", checkToken, imageUpload.single("profile_picture"), usersController.patchUser);

Router.delete("/:id", usersController.deleteUserById);

module.exports = Router;