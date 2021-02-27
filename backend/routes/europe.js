const express = require('express')
const europeRoutes = express.Router()
const RegionController = require("../controllers/region")
const auth = require("../middleware/auth")

europeRoutes.get("/", RegionController.getRegionRandom)

europeRoutes.get("/recipe/:id", RegionController.getRecipe)

europeRoutes.get("/recipe/:id/rate", RegionController.getRate)

europeRoutes.post("/recipe/:id/rate", auth, RegionController.rateRecipe)

europeRoutes.get("/recipe/:id/comments", RegionController.getComments)

europeRoutes.post("/recipe/:id/comment", auth, RegionController.addComment)

module.exports = europeRoutes