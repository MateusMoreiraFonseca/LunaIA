const userService = require("../services/userService");
const adminService = require("../services/adminService");

const registerAdmin = async (req, res) => {
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

    const registerdAdmin = await adminService.createAdmin({
      username,
      password,
      email,
      nameUser,
      age,
    });

    res.status(201).json({ registerdAdmin });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};
const setAdmin = async (req, res) => {
  try {
    const { userId, username, email } = req.body;

    if (!userId && !username && !email) {
      return res
        .status(400)
        .json({ message: "É necessário fornecer userId, username ou email." });
    }

    const userToUpdate = await userService.getUserByIdUsernameEmail({
      userId,
      username,
      email,
    });

    if (!userToUpdate) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    userToUpdate.isAdmin = true;

    const promotedAdmin = await userToUpdate.save();

    res.status(200).json({ promotedAdmin });
  } catch (error) {
    console.error("Erro ao definir usuário como administrador:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const removeAdmin = async (req, res) => {
  try {
    const { userId, username, email } = req.body;

    if (!userId && !username && !email) {
      return res
        .status(400)
        .json({ message: "É necessário fornecer userId, username ou email." });
    }

    const conditions = {};
    if (userId) {
      conditions._id = userId;
    } else if (username) {
      conditions.username = username;
    } else if (email) {
      conditions.email = email;
    }

    const userToUpdate = await userService.getUserByIdUsernameEmail(conditions);

    if (!userToUpdate) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    if (!userToUpdate.isAdmin) {
      return res
        .status(403)
        .json({ message: "O usuário não é um administrador." });
    }

    userToUpdate.isAdmin = false;
    const removekAdmin = await userToUpdate.save();

    res.status(200).json({ removekAdmin });
  } catch (error) {
    console.error("Erro ao remover privilégios de administrador:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const conditions = { username, password, email };

    const deletedUser = await adminService.deleteUser(conditions);

    res.status(200).json(deletedUser);
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor." + error });
  }
};

const updateUser = async (req, res) => {
  const idUser = req.params;
  try {
    const user = await userService.getUserByIdUsernameEmail(idUser);

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
module.exports = {
  setAdmin,
  removeAdmin,
  deleteUser,
  registerAdmin,
  updateUser,
};
