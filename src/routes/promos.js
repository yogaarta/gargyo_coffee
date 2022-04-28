const Router = require("express").Router();
const promosController = require("../controllers/promos");
const validate = require("../middlewares/validate");

Router.get("/all", promosController.getAllPromos);
Router.get("/", validate.queryFindPromo, promosController.findPromoByQuery);
Router.post("/", validate.bodyPostPromo, promosController.createPromo);
Router.put("/:promo_id", promosController.putPromo);
Router.delete("/:promo_id", promosController.deletePromoById);

module.exports = Router;