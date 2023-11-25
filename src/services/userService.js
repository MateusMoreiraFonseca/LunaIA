// userService.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const getUserByIdUsernameEmail = async (conditions) => {
  try {
    if (typeof conditions !== "object") {
      throw new Error(
        "Condições inválidas fornecidas para a busca do usuário."
      );
    }

    const { username, email, userId } = conditions;

    const searchConditions = {};
    if (userId) {
      searchConditions._id = userId;
    } else if (username) {
      searchConditions.username = username;
    } else if (email) {
      searchConditions.email = email;
    }

    const user = await User.findOne(searchConditions);

    return user;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (conditions, userData, res) => {
  try {
    const { nome, idade, newPassword, newUsername, newEmail } = userData;
    const user = await getUserByIdUsernameEmail(conditions);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    user.nome = nome || user.nome;
    user.idade = idade || user.idade;

    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
    }

    // Handle username and email updates
    if (newUsername) {
      user.username = newUsername;
    }

    if (newEmail) {
      user.email = newEmail;
    }

    await user.save();
    saveToken(user, res);

    return {
      message: "Dados pessoais atualizados com sucesso.",
    };
  } catch (error) {
    console.error("Erro ao alterar dados pessoais:", error);
    throw error;
  }
};

const saveToken = (user, res) => {
  const infoToken = {
    userId: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
  };

  const token = jwt.sign({ payload: infoToken }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return token;
};

module.exports = { getUserByIdUsernameEmail,updateUser, saveToken };
