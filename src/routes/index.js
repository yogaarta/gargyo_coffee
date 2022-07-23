const express = require("express");
const Router = express.Router();

const usersRouter = require("./users");
const productsRouter = require("./products");
const transactionsRouter = require("./transactions");
const promosRouter = require("./promos");
const authRouter = require("./auth");
const notifRouter = require("./notif")

Router.get("/", (req, res) => {
  res.json({
    message: "Welcome to Gargyo Coffee Server"
  })
})

Router.use("/users", usersRouter);

Router.use("/products", productsRouter);

Router.use("/transactions", transactionsRouter);

Router.use("/promos", promosRouter);

Router.use("/auth", authRouter);

Router.use("/notif", notifRouter)

module.exports = Router;