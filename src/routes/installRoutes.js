const express = require("express");
const router = express.Router();

const setupSystem = require("../setup/setupSistema");

router.post("/install", setupSystem.installAll);

module.exports = router;
