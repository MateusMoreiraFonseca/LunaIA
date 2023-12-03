const mongoose = require("mongoose");

const respostaIaSchema = new mongoose.Schema({
  pergunta: { type: String, required: true },
  titulo: { type: String, required: true },
  resposta: { type: String, required: true },
  task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
});

const RespostaIa = mongoose.model("RespostaIa", respostaIaSchema);

module.exports = RespostaIa;
