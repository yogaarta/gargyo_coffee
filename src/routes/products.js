const Router = require("express").Router();
const productsController = require("../controllers/products");
const validate = require("../middlewares/validate");
const { imageUpload } = require("../middlewares/upload");
const { checkToken } = require("../middlewares/auth");

Router.get("/all", productsController.getAllProducts);
Router.get("/favorite", productsController.getAllFavoriteProducts);
Router.get("/:id", productsController.getProductsById);
Router.get("/", validate.queryFindProduct, productsController.findProductByQuery);
Router.post("/", checkToken, imageUpload.single("picture"), validate.bodyPostProduct, productsController.createProduct);
Router.patch("/:id", productsController.putProduct);
Router.delete("/:id", productsController.deleteProductById);

module.exports = Router;