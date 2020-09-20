const router = require("express").Router()
const user = require("./handler/user")
const { isAuth } = require("./authMiddleware")
router.post("/login", user.login)
router.post("/register", user.register)
router.post("/refresh-token", user.refreshToken)
router.post("/check", isAuth, user.check)

module.exports = router