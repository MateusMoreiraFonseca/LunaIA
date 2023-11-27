// userService.js
const jwt = require("jsonwebtoken");

const userService = require("./userService");

const deleteUser = async (conditions) => {
  try {
    const user = await userService.getUserByIdUsernameEmail(conditions);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    await user.deleteOne();

    return {
      message: "Usuário excluído com sucesso.",
    };
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    throw error;
  }
};

module.exports = { deleteUser };
