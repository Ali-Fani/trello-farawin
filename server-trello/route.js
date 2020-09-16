const router = require("express").Router()
const user = require("./handler/auth")
router.post("/login", user.auth)
router.post("/register", user.register)
module.exports = router