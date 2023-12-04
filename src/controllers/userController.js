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

    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Nome de usuário e senha são obrigatórios." });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, password, email, nameUser, age } = req.body;

    const existingUserByUsername = await userService.getUserByIdUsernameEmail({
      username,
    });

    const existingUserByEmail = await userService.getUserByIdUsernameEmail({
      email,
    });

    if (existingUserByUsername || existingUserByEmail) {
      return res
        .status(400)
        .json({ message: "Usuário ou e-mail já cadastrado." });
    }

    const createdUser = await userService.createUser({
      username,
      password,
      email,
      nameUser,
      age,
    });

    res.status(201).json({ createdUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Nome de usuário , senha e email são obrigatórios." });
  }
};

const updateUserBySelf = async (req, res) => {
  try {
    const user = await userService.getUserByIdUsernameEmail(req.user);

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado." });
    }

    const { username, password, email, nameUser, age } = req.body;

    const updatedUser = await userService.updateUser(user, {
      username,
      password,
      email,
      nameUser,
      age,
    });

    res.status(200).json({ updatedUser });
  } catch (error) {
    console.error("Erro ao alterar dados pessoais:", error);
    res.status(500).json({ message: "Erro interno do servidor." + error });
  }
};

module.exports = { loginUser, registerUser, updateUserBySelf };
