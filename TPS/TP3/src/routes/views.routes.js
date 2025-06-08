const {Router} = require('express');
const  {verifyTokenViewsMiddleware}  = require('../middlewares/verifyTokenViews.middleware.js');
const PacientesViewController = require('../controllers/views/pacientes.views.controller.js')
const TurnosViewController = require('../controllers/views/turnos.views.controller.js')
const {loginViewController} = require('../controllers/home/loginView.controller.js')
const rutaVistas = Router()

// OJO: en las vistas pasa esto
// con verifyToken salta esto: {"message":"Token de acceso no proporcionado"}, sin el verify token se dirige al endpoint correctamente
rutaVistas.get('/pacientes',/*verifyTokenViewsMiddleware,*/ PacientesViewController.getPacientesView);

rutaVistas.post('/pacientes/eliminar', PacientesViewController.borrarPaciente) // ESTA RUTA ES UN DELETE, SI NO USAR FETCH
rutaVistas.post('/', PacientesViewController.crearPaciente);

rutaVistas.get('/turnos',/*verifyTokenViewsMiddleware,*/ TurnosViewController.getTurnosView);
rutaVistas.post('/', TurnosViewController.crearTurno);
rutaVistas.post('/turnos/eliminar', TurnosViewController.borrarTurno); // ESTA RUTA ES UN DELETE, SI NO USAR FETCH
rutaVistas.post('/', loginViewController);


module.exports = rutaVistas;