const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authAdminMiddleware = require("../middlewares/authAdminMiddleware");

router.put("/set-admin", authAdminMiddleware, adminController.setAdmin);
router.put("/remove-admin", authAdminMiddleware, adminController.removeAdmin);
router.delete("/delete-user", authAdminMiddleware, adminController.deleteUser);
router.post("/create-admin", authAdminMiddleware, adminController.registerAdmin);

module.exports = router;
