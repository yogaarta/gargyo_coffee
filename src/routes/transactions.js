const Router = require("express").Router();
const transactionsController = require("../controllers/transactions");
const validate = require("../middlewares/validate");
const { checkToken } = require("../middlewares/auth");

Router.get("/all", transactionsController.getAllTransactions);
Router.get("/find", validate.queryFindTransactionsByDate, transactionsController.findTransactions);
Router.get("/", checkToken, transactionsController.getTransactionByUserIdControl);
Router.get("/:id", transactionsController.getTransactionDetail);
Router.post("/", checkToken, transactionsController.createTransaction);


module.exports = Router;