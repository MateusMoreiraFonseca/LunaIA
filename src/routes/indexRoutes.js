// src\routes\indexRoutes.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

module.exports = router;
