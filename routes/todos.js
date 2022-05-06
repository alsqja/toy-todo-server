const router = require("express").Router();
const controller = require("./../controllers");

// 회원가입
router.post("/user/:user_id", controller.todo.post);
router.get("/user/:user_id", controller.todo.get);

module.exports = router;
