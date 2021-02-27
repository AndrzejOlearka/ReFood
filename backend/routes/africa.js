const express = require('express')
const africaRoutes = express.Router()
const RegionController = require("../controllers/region")

africaRoutes.get("/", RegionController.getRegionRandom)

africaRoutes.get("/recipe/:id", RegionController.getRecipe)

module.exports = africaRoutes