const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");


router.post("/login", userController.loginUser);
router.post("/register-user", userController.registerUser);
router.put("/alter-userdata", authMiddleware, userController.updateUserBySelf);

module.exports = router;
