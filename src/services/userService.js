const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const userService = {
  realizarLogin: async (username, password) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return { success: false, statusCode: 401, message: "Usuário não encontrado." };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return { success: false, statusCode: 401, message: "Senha incorreta." };
      }

      const infoToken = {
        userId: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
      };

      const token = jwt.sign({ payload: infoToken }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      return { success: true, data: { user, token } };
    } catch (error) {
      console.error("Erro no serviço de login:", error);
      return { success: false, statusCode: 500, message: "Erro interno do servidor." };
    }
  },

  cadastrarUsuario: async (username, password, email) => {
    try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return { success: false, statusCode: 400, message: "Usuário ou e-mail já cadastrado." };
      }

      const newUser = new User({ username, password, email });

      await newUser.save();

      return { success: true };
    } catch (error) {
      return { success: false, statusCode: 500, message: "Erro interno do servidor." };
    }
  },

  alterarDadosUsuario: async (userId, nome, idade, newPassword) => {
    try {
      const user = await User.findById(userId);

      if (!user) {
        return { success: false, statusCode: 404, message: "Usuário não encontrado." };
      }

      user.nome = nome || user.nome;
      user.idade = idade || user.idade;

      if (newPassword) {
        user.password = newPassword;
      }

      await user.save();

      const newToken = jwt.sign(
        { userId: user._id, username: user.username, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      return { success: true, data: { user, newToken } };
    } catch (error) {
      return { success: false, statusCode: 500, message: "Erro interno do servidor." };
    }
  },
};


module.exports = userService;
