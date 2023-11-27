const User = require("../models/userModel");

const createAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({ isAdmin: true });

    if (!existingAdmin) {
      const adminUserData = {
        username: process.env.DEFAULT_ADMIN_USERNAME,
        email: process.env.DEFAULT_ADMIN_EMAIL,
        password: process.env.DEFAULT_ADMIN_PASSWORD,
        isAdmin: true,
      };

      const newAdmin = new User(adminUserData);

      await newAdmin.save();

      console.log(
        "Usuário administrador criado com sucesso:",
        newAdmin.username
      );
    } else {
      console.log(
        "Já existe um usuário administrador:",
        existingAdmin.username
      );
    }
  } catch (error) {
    console.error("Erro ao criar ou verificar usuário administrador:", error);
  }
};

module.exports = { createAdminUser };
