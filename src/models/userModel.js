const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const respostaIaSchema = new mongoose.Schema({
  pergunta: { type: String, required: true },
  titulo: { type: String, required: true },
  resposta: { type: String, required: true },
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }, 
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false },
  nameUser: { type: String },
  age: { type: Number },
  RespostasSalvasIA: [respostaIaSchema],
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
const RespostaIa = mongoose.model("RespostaIa", respostaIaSchema);

module.exports = { User, RespostaIa };
