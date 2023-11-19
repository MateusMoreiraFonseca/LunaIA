// models/userModel.js
const mongoose = require("mongoose");

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
});

const User = mongoose.model("User", userSchema);

module.exports = User;
