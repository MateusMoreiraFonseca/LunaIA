// userService.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const userService = require("./userService");

const createAdmin = async (userData, res) => {
  try {
    const { username, email, password, nameUser, age } = userData;

    const newUser = new User({
      username,
      email,
      password,
      nameUser,
      age,
      isAdmin: true,
    });

    await newUser.save();

    return {
      message: "Usuário criado com sucesso.",
    };
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (conditions) => {
  try {
    const user = await userService.getUserByIdUsernameEmail(conditions);

    if (!user.isAdmin) {
      await user.deleteOne();
      return {
        message: "Usuário excluído com sucesso.",
      };
    } else {
      return {
        message: "Não é possível excluir outros usuários Admins",
      };
    }
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    throw error;
  }
};

module.exports = { deleteUser, createAdmin };
