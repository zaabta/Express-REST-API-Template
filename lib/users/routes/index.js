const express = require("express")
const router = express.Router()
const controllers = require("../controllers")
const middleware = require("../../middleware")

router.post("/", controllers.store)
router.post("/login", controllers.login)
router.get("/", middleware.isAuthenticated, controllers.index)


module.exports = router