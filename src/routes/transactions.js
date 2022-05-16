const Router = require("express").Router();
const transactionsController = require("../controllers/transactions");
const validate = require("../middlewares/validate");
const { checkToken, userRole } = require("../middlewares/auth");

Router.get("/all", transactionsController.getAllTransactions);
Router.get("/", validate.queryFindTransactionsByDate, transactionsController.findTransactions);
Router.post("/", checkToken, userRole, transactionsController.createTransaction);


module.exports = Router;