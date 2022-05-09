const router = require("express").Router();
const controller = require("./../controllers");

router.get("/:user_id/data", controller.user.getData);
router.get("/:user_id", controller.user.get);

module.exports = router;
