// setupAdmin.js
const User = require("../models/userModel");

const createAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({ isAdmin: true });
    if (!existingAdmin) {
      const adminUser = {
        username: "admin",
        password: "admin123",
        email: "admin@example.com",
        isAdmin: true,
      };

      await User.create(adminUser);
      console.log("Usuário administrador criado com sucesso");
    }
  } catch (error) {
    console.error("Erro ao criar usuário administrador:", error);
  }
};

module.exports = { createAdminUser };
