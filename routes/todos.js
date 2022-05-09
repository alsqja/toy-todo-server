const router = require("express").Router();
const controller = require("./../controllers");

// 회원가입
router.post("/user/:user_id", controller.todo.post);
router.get("/user/:user_id", controller.todo.get);
router.put("/:todo_id/user/:user_id", controller.todo.put);
router.delete("/:todo_id/user/:user_id", controller.todo.delete);

module.exports = router;
