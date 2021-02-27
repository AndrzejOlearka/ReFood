const express = require('express')
const mainRoutes = express.Router()
const MainController = require("../controllers/main")

const auth = require("../middleware/auth")

mainRoutes.get("/user", auth, MainController.userData)

mainRoutes.post("/register",  MainController.register)

mainRoutes.post("/login",  MainController.login)

mainRoutes.post("/authentication", MainController.auth)

module.exports = mainRoutes