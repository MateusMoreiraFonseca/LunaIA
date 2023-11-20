const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authService = {
  solicitarResetSenha: async (email) => {
    // Lógica de solicitar reset de senha aqui...

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return { success: false, statusCode: 404, message: "Usuário não encontrado." };
      }

      const resetToken = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      user.resetToken = resetToken;

      await user.save();

      return { success: true, data: { resetToken } };
    } catch (error) {
      return { success: false, statusCode: 500, message: "Erro interno do servidor." };
    }
  },

  redefinirSenha: async (token, newPassword) => {
    // Lógica de redefinir senha aqui...

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decodedToken.userId);

      if (!user) {
        return { success: false, statusCode: 404, message: "Usuário não encontrado." };
      }

      user.password = newPassword;
      user.resetToken = null;

      await user.save();

      return { success: true };
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return { success: false, statusCode: 400, message: "Token expirado. Solicite um novo." };
      }

      return { success: false, statusCode: 500, message: "Erro interno do servidor." };
    }
  },
};

module.exports = authService;
