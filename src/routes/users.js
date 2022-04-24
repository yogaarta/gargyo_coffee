const Router = require("express").Router()
const usersController = require("../controllers/users")

Router.get("/", (req, res) => {
    res.json({
        msg: "ini get users"
    })
})

Router.get("/all", usersController.getAllUsers)

Router.get("/1", usersController.getSingleUser)

module.exports = Router