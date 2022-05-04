const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const authRouter = require("./auth");

/* GET home page. */
router.use("/auth", authRouter);
router.use("/user", usersRouter);

module.exports = router;
