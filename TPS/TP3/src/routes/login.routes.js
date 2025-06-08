// routes/login.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/API/loginController.js');

router.post('/', loginController.login);

module.exports = router;
