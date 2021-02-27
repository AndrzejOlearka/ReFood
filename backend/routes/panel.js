const express = require('express')
const mainRoutes = express.Router()

const auth = require("../middleware/auth")

const PanelController = require("../controllers/panel")

mainRoutes.post("/recipe/add", auth, PanelController.addRecipe)

mainRoutes.get("/recipes/user/:user/all", PanelController.allRecipes)

mainRoutes.get("/recipes/user/:user/rates", PanelController.allRates)

module.exports = mainRoutes