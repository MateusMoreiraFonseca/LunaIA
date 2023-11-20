// models/userModel.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const respostaSchema = new mongoose.Schema({
  pergunta: { type: String, required: true },
  resposta: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false },
  nome: { type: String },
  idade: { type: Number },
  RespostasSalvasIA: [respostaSchema],
  resetToken: { type: String },
});
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
