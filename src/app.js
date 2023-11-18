// Importando as dependências
const express = require("express");
const conectarMongo = require("./helpers/mongodb"); // Importe o middleware
require("dotenv").config();

// Configurando o Express
const app = express();
const port = process.env.PORT || 3001;

// Configurando o middleware do MongoDB
// app.use(conectarMongo);

// Configurando o middleware do Express para lidar com dados JSON
app.use(express.json());

// Definindo uma rota de exemplo
app.get("/", (req, res) => {
  res.send("Bem-vindo à sua aplicação!");
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
