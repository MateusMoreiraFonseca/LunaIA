// userService.js
const User = require("../models/userModel");

const getUser = async (conditions) => {
  try {
    if (typeof conditions !== "object") {
      throw new Error(
        "Condições inválidas fornecidas para a busca do usuário."
      );
    }

    const { username, email, userId } = conditions;

    const searchConditions = {};
    if (userId) {
      searchConditions._id = userId;
    } else if (username) {
      searchConditions.username = username;
    } else if (email) {
      searchConditions.email = email;
    }

    const user = await User.findOne(searchConditions);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { getUser };
