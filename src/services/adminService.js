// userService.js
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const userService = require("./userService");

const createAdmin = async (userData, res) => {
  try {
    const { username, email, password, nameUser, age } = userData;
    
    if (age) {
      if (typeof age !== 'number' || age < 0 || age > 120) {
        throw new Error("Idade inválida. A idade deve ser um número entre 0 e 120.");
      }
    }

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
      message: newUser,
    };
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (conditions) => {
  try {
    const user = await userService.getUserByIdUsernameEmail(conditions);

    if (!user) {
      return {
        message: "Usuário não encontrado.",
      };
    }

    if (!user.isAdmin) {
      await user.deleteOne();
      return { user };
    } else {
      return {
        message: "Não é possível excluir outros usuários Admins.",
      };
    }
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    throw error;
  }
};
module.exports = { deleteUser, createAdmin };
