const router = require("express").Router()
const user = require("./handler/auth")
const {isAuth} = require("./authMiddleware")
router.post("/login", user.auth)
router.post("/register", user.register)
router.post("/check",isAuth, user.check)

module.exports = router