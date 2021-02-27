const express = require('express')
const australiaRoutes = express.Router()
const RegionController = require("../controllers/region")

australiaRoutes.get("/", RegionController.getRegionRandom)

australiaRoutes.get("/recipe/:id", RegionController.getRecipe)

module.exports = australiaRoutes