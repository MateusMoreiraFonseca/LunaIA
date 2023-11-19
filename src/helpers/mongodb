// src\helpers\mongodb
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const dbName = mongoose.connection.db.databaseName;
    console.log(`Conectado ao MongoDB: ${dbName}`);
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
};

module.exports = { mongoDB };
