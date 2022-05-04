const router = require("express").Router();
const controller = require("./../controllers");

// 회원가입
router.post("/signup", controller.signup.post);
router.post("/signin", controller.signin.post);

module.exports = router;
