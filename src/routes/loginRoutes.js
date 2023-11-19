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
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const payload = {
      userId: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.post("/reset-password", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        const crypto = require("crypto");
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiration = Date.now() + 3600000;

        try {
            user.resetToken = resetToken;
            user.resetTokenExpiration = resetTokenExpiration;
            await user.save();
        } catch (error) {
            console.error("Erro ao associar token ao usuário:", error);
            throw new Error("Erro ao associar token ao usuário.");
        }

        const jwtToken = jwt.sign(
            { userId: user._id, resetToken, expiresIn: resetTokenExpiration },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ resetToken: jwtToken, message: "Token JWT gerado com sucesso." });
    } catch (error) {
        console.error("Erro ao solicitar redefinição de senha:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
});





module.exports = router;
