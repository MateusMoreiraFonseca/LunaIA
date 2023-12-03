const express = require("express");
const router = express.Router();

const respostaIaController = require("../controllers/respostaIaController");

const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.post("/pergunta-ia/:taskId", respostaIaController.perguntaIA);

module.exports = router;
