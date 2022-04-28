const Router = require("express").Router();
const usersController = require("../controllers/users");
const validate = require("../middlewares/validate");


Router.get("/all", usersController.getAllUsers);

Router.get("/:user_id", usersController.getUserById);

Router.get("/", validate.queryFindUser, usersController.findUserByQuery);

Router.post("/", validate.bodyPostUser, usersController.postUser);

Router.put("/:user_id", usersController.putUser);

Router.delete("/:user_id", usersController.deleteUserById);

module.exports = Router;