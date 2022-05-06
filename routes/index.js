const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const authRouter = require("./auth");
const todoRouter = require("./todos");

/* GET home page. */
router.use("/auth", authRouter);
router.use("/user", usersRouter);
router.use("/todo", todoRouter);

module.exports = router;
