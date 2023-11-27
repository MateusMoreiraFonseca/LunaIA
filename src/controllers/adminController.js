const userService = require("../services/userService");
const adminService = require("../services/adminService");

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

    await userToUpdate.save();

    res
      .status(200)
      .json({ message: "Usuário promovido a administrador com sucesso." });
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

    const userToUpdate = await userService.getUserByIdUsernameEmail(
      conditions
    );

    if (!userToUpdate) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    if (!userToUpdate.isAdmin) {
      return res
        .status(403)
        .json({ message: "O usuário já não é um administrador." });
    }

    userToUpdate.isAdmin = false;
    await userToUpdate.save();

    res
      .status(200)
      .json({ message: "Privilégios de administrador removidos com sucesso." });
  } catch (error) {
    console.error("Erro ao remover privilégios de administrador:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const conditions = { username, password, email };

    const result = await adminService.deleteUser(conditions);

    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor." + error });
  }
};

module.exports = {
  setAdmin,
  removeAdmin,
  deleteUser,
};
