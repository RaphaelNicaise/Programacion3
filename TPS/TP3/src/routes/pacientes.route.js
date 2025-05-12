const {Router} = require('express');
const {getPacientes} = require('../controllers/API/pacientes.controller.js')
const rutaPacientes = Router();
rutaPacientes.get('/', getPacientes);
//Otras rutas CRUD


module.exports = rutaPacientes;