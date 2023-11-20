const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const authService = require("../services/authService");

const authController = {
  resetPassword: async (req, res) => {
    const { email } = req.body;

    try {
      const result = await authService.solicitarResetSenha(email);

      if (result.success) {
        const { resetToken } = result.data;
        res.status(200).json({ resetToken, message: "Solicitação de reset de senha enviada." });
      } else {
        res.status(result.statusCode).json({ message: result.message });
      }
    } catch (error) {
      console.error("Erro ao solicitar redefinição de senha:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  },

  redefinePassword: async (req, res) => {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({ message: "Token e newPassword são obrigatórios." });
      }

      const result = await authService.redefinirSenha(token, newPassword);

      if (result.success) {
        res.status(200).json({ message: "Senha redefinida com sucesso." });
      } else {
        res.status(result.statusCode).json({ message: result.message });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  },
};

module.exports = authController;
