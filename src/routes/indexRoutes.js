// src/routes/indexRoutes.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const routesData = {
    routes: [
      {
        route: "http://localhost:3000/auth/login",
        method: "POST",
        description: "Realiza login de usuário.",
        example: `
          Envie uma requisição POST para:
          http://localhost:3000/auth/login
          com o corpo da requisição:
          {
            "username": "seuNomeDeUsuario",
            "password": "suaSenha"
          }
        `,
      },
    ],
  };

  res.json(routesData);
});

module.exports = router;
