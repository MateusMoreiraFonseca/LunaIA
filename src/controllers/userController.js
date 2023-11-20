const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log(`Usuário não encontrado para o username: ${username}`);
      return res.status(401).json({ message: "Usuário não encontrado." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`Senha incorreta para o username: ${username}`);
      return res.status(401).json({ message: "Senha incorreta." });
    }

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

    console.log(`Usuário ${username} fez login com sucesso.`);
    res.status(200).json({ message: "Login com sucesso." });
  } catch (error) {
    console.error("Erro durante o login:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Usuário ou e-mail já cadastrado." });
    }

    const newUser = new User({ username, password, email });

    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
        username: newUser.username,
        isAdmin: newUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({ token, message: "Cadastro realizado com sucesso." });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const updateUserData = async (req, res) => {
  try {
    const { nome, idade, newPassword } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
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

    res.cookie("token", newToken, { httpOnly: true });

    res.status(200).json({
      message: "Dados pessoais atualizados com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao alterar dados pessoais:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = { loginUser, registerUser, updateUserData };
