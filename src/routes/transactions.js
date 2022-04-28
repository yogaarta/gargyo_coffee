const Router = require("express").Router();
const transactionsController = require("../controllers/transactions");
const validate = require("../middlewares/validate");

Router.get("/all", transactionsController.getAllTransactions);
Router.get("/", validate.queryFindTransactionsByDate, transactionsController.findTransactions);
Router.post("/", transactionsController.createTransaction);


module.exports = Router;