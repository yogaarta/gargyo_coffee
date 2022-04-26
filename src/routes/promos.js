const Router = require("express").Router()
const { Route } = require("express")
const promosController = require("../controllers/promos")

Router.get("/all", promosController.getAllPromos)
Router.get("/", promosController.findPromoByQuery)
Router.post("/", promosController.createPromo)
Router.put("/:promo_id", promosController.putPromo)
Router.delete("/:promo_id", promosController.deletePromoById)

module.exports = Router