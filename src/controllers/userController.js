const bcrypt = require("bcrypt");
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
    const { username, password, email, nameUser, age } = req.body;

    const existingUser = await userService.getUserByIdUsernameEmail({
      username,
      email,
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Usuário ou e-mail já cadastrado." });
    }

    await userService.createUser({
      username,
      password,
      email,
      nameUser,
      age,
    });

    res.status(201).json({ message: "Cadastro realizado com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const updateUserBySelf = async (req, res) => {
  try {
    const user = await userService.getUserByIdUsernameEmail(req.user);

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado." });
    }

    const { username, password, email, nameUser, age } = req.body;

    const result = await userService.updateUser(user, {
      username,
      password,
      email,
      nameUser,
      age,
    });

    res.status(200).json({ message: result.message });
  } catch (error) {
    console.error("Erro ao alterar dados pessoais:", error);
    res.status(500).json({ message: "Erro interno do servidor." + error });
  }
};

module.exports = { loginUser, registerUser, updateUserBySelf };
