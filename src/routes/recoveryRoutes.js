const express = require("express");
const recoveryController = require("../controllers/");

const router = express.Router();

router.post("/reset-password", recoveryController.resetPassword);
router.post("/redefine-password", recoveryController.redefinePassword);

module.exports = router;
