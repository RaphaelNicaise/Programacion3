const {Router} = require('express');
const PacientesViewController = require('../controllers/views/pacientes.views.controller.js')
const TurnosViewController = require('../controllers/views/turnos.views.controller.js')
const rutaVistas = Router()

//rutas pacientes

// OJO: en las vistas pasa esto
// con verifyToken salta esto: {"message":"Token de acceso no proporcionado"}, sin el verify token se dirige al endpoint correctamente
rutaVistas.get('/pacientes',/*verifyTokenViewsMiddleware,*/ PacientesViewController.getPacientesView);

rutaVistas.post('/pacientes/eliminar', PacientesViewController.borrarPaciente) // ESTA RUTA ES UN DELETE, SI NO USAR FETCH
rutaVistas.post('/', PacientesViewController.crearPaciente);


//rutas turnos

rutaVistas.get('/turnos',/*verifyTokenViewsMiddleware,*/ TurnosViewController.getTurnosView);
rutaVistas.post('/', TurnosViewController.crearTurno);
rutaVistas.post('/turnos/eliminar', TurnosViewController.borrarTurno); // ESTA RUTA ES UN DELETE, SI NO USAR FETCH


module.exports = rutaVistas;