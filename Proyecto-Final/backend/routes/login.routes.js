// routes/login.js
const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/login.controller.js');

router.post('/', LoginController.login); //Iniciar sesión normal
router.post('/create', LoginController.signUp) //Actua como ruta para crear una cuenta

module.exports = router;