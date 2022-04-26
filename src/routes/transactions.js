const Router = require("express").Router();
const transactionsController = require("../controllers/transactions")

Router.get("/all", transactionsController.getAllTransactions)
Router.get("/", transactionsController.findTransactions)
Router.post("/", transactionsController.createTransaction)


module.exports = Router