const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authAdminMiddleware = require("../middlewares/authAdminMiddleware");

router.post("/set-admin", authAdminMiddleware, adminController.setAdmin);
router.post("/remove-admin", authAdminMiddleware, adminController.removeAdmin);

module.exports = router;
