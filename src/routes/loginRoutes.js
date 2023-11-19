// src/routes/authRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado." });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    const payload = {
      userId: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ token, message: "Login com sucesso." });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});

router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const resetToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    await user.save();

    res
      .status(200)
      .json({ resetToken, message: "Solicitação de reset de senha enviada." });
  } catch (error) {
    console.error("Erro ao solicitar redefinição de senha:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});

router.post("/redefine-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token e newPassword são obrigatórios." });
    }

    await User.updateOne({ resetToken: token }, { password: newPassword });

    return res.status(200).json({ message: "Senha redefinida com sucesso." });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(400)
        .json({ message: "Token expirado. Solicite um novo." });
    }

    return res.status(500).json({ message: "Erro interno do servidor." });
  }
});

module.exports = router;
