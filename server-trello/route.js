const router = require("express").Router();
const user = require("./handler/user");
const board = require("./handler/board");

const { isAuth } = require("./authMiddleware");
//user
router.post("/login", user.login);
router.post("/register", user.register);
router.post("/refresh-token", user.refreshToken);
router.post("/check", isAuth, user.check);

//board
router.post("/board", isAuth, board.create);
router.put("/board", isAuth, board.update);
router.get("/board", isAuth, board.list);

module.exports = router;
