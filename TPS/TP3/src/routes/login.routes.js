// routes/login.js
const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/API/login.controller.js');

// Colocamos la contraseña del archivo
router.post('/', LoginController.login);

module.exports = router;
