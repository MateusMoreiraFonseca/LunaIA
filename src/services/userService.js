const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const getUserByIdUsernameEmail = async (conditions) => {
  if (!conditions || Object.keys(conditions).length === 0) {
    throw new Error("Condições inválidas fornecidas para a busca do usuário.");
  }

  const { username, email, userId } = conditions;

  if (!userId && !username && !email) {
    throw new Error("É necessário fornecer userId, username ou email.");
  }

  const searchConditions = {};

  if (userId) {
    searchConditions._id = userId;
  } else if (username) {
    searchConditions.username = username;
  } else if (email) {
    searchConditions.email = email;
  }

  return await User.findOne(searchConditions);
};

const createUser = async (userData, res) => {
  try {
    const { username, email, password, nameUser, age } = userData;

    const newUser = new User({
      username,
      email,
      password,
      nameUser,
      age,
    });

    await newUser.save();

    return {
      message: "Usuário criado com sucesso.",
    };
  } catch (error) {
    throw error;
  }
};

const updateUser = async (user, userData, res) => {
  try {
    const { username, password, email, nameUser, age } = userData;

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    if (username) {
      user.username = username;
    }

    if (password) {
      user.password = password;
    }

    if (email) {
      user.email = email;
    }

    if (nameUser) {
      user.nameUser = nameUser;
    }

    if (age) {
      user.age = age;
    }

    await user.save();

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

module.exports = {
  getUserByIdUsernameEmail,
  updateUser,
  saveToken,
  createUser,
};
