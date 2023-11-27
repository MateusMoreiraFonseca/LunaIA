// installRoutes.js
const express = require('express');
const router = express.Router();


const { createAdminUser } = require("../setup/setupAdmin");

router.get('/install', (req, res) => { 
    createAdminUser();
    res.send('UsuárioAdmEspecial criado ou já existe');
});

module.exports = router;
