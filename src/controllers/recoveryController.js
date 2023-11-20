const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


const resetPassword = async (req, res) => {
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

    user.resetToken = resetToken;

    await user.save();

    res
      .status(200)
      .json({ resetToken, message: "Solicitação de reset de senha enviada." });
  } catch (error) {
    console.error("Erro ao solicitar redefinição de senha:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const redefinePassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token e newPassword são obrigatórios." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    user.password = newPassword;
    user.resetToken = null;

    await user.save();

    return res.status(200).json({ message: "Senha redefinida com sucesso." });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(400)
        .json({ message: "Token expirado. Solicite um novo." });
    }

    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = { resetPassword, redefinePassword };
