const Router = require("express").Router();
const productsController = require("../controllers/products");
const validate = require("../middlewares/validate");
const { uploadImage } = require("../middlewares/upload");
const { checkToken, adminRole } = require("../middlewares/auth");

Router.get("/", productsController.getAllProducts);
Router.get("/favorite", productsController.getAllFavoriteProducts);
Router.get("/:id", productsController.getProductsById);
Router.post("/", checkToken, adminRole, uploadImage, validate.bodyPostProduct, productsController.createProduct);
Router.patch("/:id", checkToken, adminRole, uploadImage, productsController.patchProduct);
Router.delete("/:id", checkToken, adminRole, productsController.deleteProductById);

module.exports = Router;