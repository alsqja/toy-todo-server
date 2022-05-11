const router = require("express").Router();
const controller = require("./../controllers");

router.get("/:user_id/data", controller.user.getData);
router.get("/:user_id", controller.user.get);
router.put("/:user_id", controller.user.put);
router.delete("/:user_id", controller.user.delete);

module.exports = router;
