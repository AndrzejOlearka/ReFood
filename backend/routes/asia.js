const express = require('express')
const asiaRoutes = express.Router()
const RegionController = require("../controllers/region")

asiaRoutes.get("/", RegionController.getRegionRandom)

asiaRoutes.get("/recipe/:id", RegionController.getRecipe)

module.exports = asiaRoutes