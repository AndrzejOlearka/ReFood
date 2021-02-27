const express = require('express')
const americaRoutes = express.Router()
const RegionController = require("../controllers/region")

americaRoutes.get("/", RegionController.getRegionRandom)

americaRoutes.get("/recipe/:id", RegionController.getRecipe)

module.exports = americaRoutes