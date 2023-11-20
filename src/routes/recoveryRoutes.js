const express = require("express");
const router = express.Router();
const recoveryController = require("../controllers/recoveryController");

router.post("/login", recoveryController.loginUser);
router.post("/reset-password", recoveryController.resetPassword);
router.post("/redefine-password", recoveryController.redefinePassword);

module.exports = router;
