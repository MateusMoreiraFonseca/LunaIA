//srv\helpers\mongodb.js

const mongoose = require("mongoose");

const connectToDatabase = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});

    const db = mongoose.connection;

    db.on("error", (error) => {
      console.error("Erro na conexão com o MongoDB:", error.message);
      res.status(500).send("Erro interno do servidor: " + error.message);
    });

    db.once("open", () => {
      console.log("Conectado ao banco de dados MongoDB");
      next();
    });
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados MongoDB:", error.message);
    res.status(500).send("Erro interno do servidor");
  }
};

module.exports = connectToDatabase;
