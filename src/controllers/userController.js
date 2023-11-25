const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const userService = require("../services/userService");

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userService.getUserByIdUsernameEmail(req.body);

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha incorreta." });
    }
    userService.saveToken(user, res);

    res.status(200).json({ message: "Login com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const existingUser = await userService.getUserByIdUsernameEmail(req.body);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Usuário ou e-mail já cadastrado." });
    }

    const newUser = new User({ username, password, email });
    await newUser.save();

    res.status(201).json({ message: "Cadastro realizado com sucesso." });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const updateUser = async (req, res) => {
  try {
    const { nome, idade, newPassword, newUsername, newEmail } = req.body;
    const conditions = req.user;

    const result = await userService.updateUser(
      conditions,
      { nome, idade, newPassword, newUsername, newEmail },
      res
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao alterar dados pessoais:", error);
    res.status(500).json({ message: "Erro interno do servidor." + error });
  }
};


module.exports = { loginUser, registerUser, updateUser };
