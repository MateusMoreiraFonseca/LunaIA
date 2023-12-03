// installRoutes.js
const express = require('express');
const router = express.Router();


const { createAdminUser } = require("../setup/setupAdmin");

router.get('/install', (req, res) => { 
    
    res.send(createAdminUser());
});

module.exports = router;
