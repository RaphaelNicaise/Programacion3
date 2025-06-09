const {Router} = require('express');
const  {verifyTokenMiddleware}  = require('../middlewares/verifyToken.middleware.js');
const pacientesController = require('../controllers/API/pacientes.controller.js');
const {pacienteSchema} = require('../schemas/paciente.schema.js')
const {pacientes} = require('../controllers/home/home.controller.js')
const rutaPacientes = Router();


//para obtener todos los pacientes
rutaPacientes.get('/',verifyTokenMiddleware, pacientesController.getPacientes);
//agregamos un paciente
rutaPacientes.post('/', verifyTokenMiddleware, pacientesController.crearPaciente);
// actualizamos un paciente
rutaPacientes.put('/:id', verifyTokenMiddleware, pacientesController.modificarPaciente);
// eliminamos un paciente
rutaPacientes.delete('/:id', verifyTokenMiddleware, pacientesController.borrarPaciente);

module.exports = rutaPacientes;

