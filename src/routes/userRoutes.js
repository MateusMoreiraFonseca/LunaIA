const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware")

router.post("/login", userController.login);
router.post("/registrar-usuario", userController.registrarUsuario);
router.put("/alterar-dados", authMiddleware, userController.alterarDados);

module.exports = router;
