const express = require("express")
const Router = express.Router()

const usersRouter = require("./users")

Router.use("/users", usersRouter)


module.exports = Router