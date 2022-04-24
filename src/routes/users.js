const Router = require("express").Router()
const usersController = require("../controllers/users")

// Router.get("/", (req, res) => {
//     res.json({
//         msg: "ini get users"
//     })
// })

Router.get("/all", usersController.getAllUsers)

Router.get("/:id", usersController.getUserById)

Router.get("/", usersController.findUserByQuery)

module.exports = Router