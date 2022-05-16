const Router = require("express").Router();
const productsController = require("../controllers/products");
const validate = require("../middlewares/validate");
const { imageUpload } = require("../middlewares/upload");
const { checkToken, adminRole } = require("../middlewares/auth");

Router.get("/all", productsController.getAllProducts);
Router.get("/favorite", productsController.getAllFavoriteProducts);
Router.get("/:id", productsController.getProductsById);
Router.get("/", validate.queryFindProduct, productsController.findProductByQuery);
Router.post("/", checkToken, adminRole, imageUpload.single("picture"), validate.bodyPostProduct, productsController.createProduct);
Router.patch("/:id", checkToken, adminRole, imageUpload.single("picture"), productsController.putProduct);
Router.delete("/:id", checkToken, productsController.deleteProductById);

module.exports = Router;