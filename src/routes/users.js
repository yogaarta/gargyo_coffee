const Router = require("express").Router()
const usersController = require("../controllers/users")


Router.get("/all", usersController.getAllUsers)

Router.get("/:user_id", usersController.getUserById)

Router.get("/", usersController.findUserByQuery)

Router.post("/", usersController.postUser)

Router.put("/:user_id", usersController.putUser)

Router.delete("/:user_id", usersController.deleteUserById)

module.exports = Router