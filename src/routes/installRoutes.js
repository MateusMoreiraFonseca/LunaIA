const express = require("express");
const router = express.Router();

const setupSystem = require("../setup/setupSistema");

const authAdminMiddleware = require("../middlewares/authAdminMiddleware");

router.use(authAdminMiddleware);
router.post("/install", setupSystem.installAll);

module.exports = router;
