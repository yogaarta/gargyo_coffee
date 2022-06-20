const Router = require("express").Router();
const promosController = require("../controllers/promos");
const validate = require("../middlewares/validate");
const { uploadImage } = require("../middlewares/upload");
const { checkToken, adminRole } = require("../middlewares/auth");

Router.get("/all", promosController.getAllPromos);
Router.get("/today", promosController.getPromoByDateControl);
Router.get("/:id", promosController.getPromoByIdControl);
Router.get("/", validate.queryFindPromo, promosController.findPromoByQuery);
Router.post("/", checkToken, adminRole, uploadImage, validate.bodyPostPromo, promosController.createPromo);
Router.patch("/:id", checkToken, adminRole, uploadImage, promosController.putPromo);
Router.delete("/:id", promosController.deletePromoById);

module.exports = Router;