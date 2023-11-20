const userService = require("../services/userService");

const userController = {
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const result = await userService.realizarLogin(username, password);

      if (result.success) {
        const { user, token } = result.data;

        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: "Login com sucesso.", user });
      } else {
        res.status(result.statusCode).json({ message: result.message });
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  },

  registrarUsuario: async (req, res) => {
    try {
      const { username, password, email } = req.body;

      const result = await userService.cadastrarUsuario(username, password, email);

      if (result.success) {
        res.status(201).json({ message: "Cadastro realizado com sucesso." });
      } else {
        res.status(result.statusCode).json({ message: result.message });
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  },

  alterarDados: async (req, res) => {
    try {
      const { nome, idade, newPassword } = req.body;
      const userId = req.user.userId;

      const result = await userService.alterarDadosUsuario(userId, nome, idade, newPassword);

      if (result.success) {
        const { user, newToken } = result.data;

        res.cookie("token", newToken, { httpOnly: true });

        res.status(200).json({
          message: "Dados pessoais atualizados com sucesso.",
          user,
        });
      } else {
        res.status(result.statusCode).json({ message: result.message });
      }
    } catch (error) {
      console.error("Erro ao alterar dados pessoais:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  },
};


module.exports = userController;
