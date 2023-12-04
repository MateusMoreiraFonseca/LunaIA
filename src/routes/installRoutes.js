const express = require("express");
const router = express.Router();

const setupSystem = require("../setup/setupSistema");

const authAdminMiddleware = require("../middlewares/authAdminMiddleware");


router.post("/install", authAdminMiddleware, setupSystem.installAll);

module.exports = router;
