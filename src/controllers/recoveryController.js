const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userService.getUserByIdUsernameEmail({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const resetToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    user.resetToken = resetToken;

    const resetedPasswordUser = await user.save();

    res.status(200).json({message: "Solicitação de reset de senha enviadas para :",resetedPasswordUser });
  } catch (error) {
    console.error("Erro ao solicitar redefinição de senha:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const redefinePassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token e newPassword são obrigatórios." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userService.getUserByIdUsernameEmail({ userId: decodedToken.userId });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    user.password = newPassword;
    user.resetToken = null;

    const redefinedUser = await user.save();

    return res.status(200).json({ message: "Senha redefinida com sucesso para " , redefinedUser });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Token expirado. Solicite um novo." });
    }

    return res.status(500).json({ message: "Erro interno do servidor." + error });
  }
};

module.exports = { resetPassword, redefinePassword };
