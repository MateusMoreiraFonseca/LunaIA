// src/routes/registerRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const router = express.Router();

router.post("/user", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Usuário ou e-mail já cadastrado." });
    }

    const newUser = new User({ username, password, email });

    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
        username: newUser.username,
        isAdmin: newUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({ token, message: "Cadastro realizado com sucesso." });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});

module.exports = router;
