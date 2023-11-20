const express = require("express");
const router = express.Router();
const recoveryController = require("../controllers/recoveryController");


router.post("/reset-password", recoveryController.resetPassword);
router.post("/redefine-password", recoveryController.redefinePassword);

module.exports = router;
