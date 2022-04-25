const Router = require("express").Router();
const productsController = require("../controllers/products");

Router.get("/all", productsController.getAllProducts)
Router.get("/:product_id", productsController.getProductsById)
Router.get("/", productsController.findProductByQuery)
Router.post("/", productsController.createProduct)
Router.put("/:product_id", productsController.putProduct)
Router.delete("/:product_id", productsController.deleteProductById)

module.exports = Router