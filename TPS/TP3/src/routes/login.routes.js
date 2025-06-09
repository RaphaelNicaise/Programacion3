// routes/login.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/API/loginController.js');

// Colocamos la contraseña del archivo .env
router.post('/', loginController.login);

module.exports = router;
