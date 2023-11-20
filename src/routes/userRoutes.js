const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");


router.post("/login", userController.loginUser);
router.post("/registrar-usuario", userController.registerUser);
router.put("/alterar-dados", authMiddleware, userController.updateUserData);

module.exports = router;
