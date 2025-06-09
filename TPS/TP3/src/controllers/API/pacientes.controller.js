const pacientesModel = require('../../models/sqlite/paciente.model.js');
const Config = require('../../config/config.js');
const jwt = require('jsonwebtoken');
const { pacienteSchema } = require('../../schemas/paciente.schema.js')

class PacientesController {

  async getPacientes(req, res) {
    try {
      const pacientes = await pacientesModel.getPacientesModel();
      res.status(200).json(pacientes);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async crearPaciente(req, res) {
    try {
      const { error } = pacienteSchema.create.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { dni, nombre, apellido, email, password } = req.body;

      const paciente = await pacientesModel.crearPacienteModel({
        dni,
        nombre,
        apellido,
        email,
        password
      });

      res.status(201).json(paciente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async borrarPaciente(req, res) {
    try {
      const id = req.params.id;
      const paciente = await pacientesModel.borrarPacienteModel(id);
      res.status(200).json({
        'mensaje': `Paciente con ID ${id} eliminado satisfactoriamente`,
        'pacienteEliminado': paciente});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

/*   async modificarPaciente(req, res) {
    try {
      const id = req.params.id;
      const { dni, nombre, apellido, email } = req.body;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('El formato del email es incorrecto');
      }
      if (nombre === null || nombre === undefined || nombre === "") {
        throw new Error('El nombre es obligatorio');
      }
      if (apellido === null || apellido === undefined || apellido === "") {
        throw new Error('El apellido es obligatorio');
      }
      if (dni === null || dni === undefined || dni === "") {
        throw new Error('El dni es obligatorio');
      }

      const paciente = await pacientesModel.modificarPacienteModel(id, { dni, nombre, apellido, email });
      res.status(200).json(paciente);
    } catch (error) {
      res.status(400).json({ error: 'el paciente no se pudo actualizar' });
    }
  } */

  async modificarPaciente(req, res) {
    const id = req.params.id;
    const { dni, nombre, apellido, email } = req.body;

    if (req.body.id){
      res.status(400).json({ error: 'ID no debe ser ingresado en el body del JSON' });
      return
    }

    try {
      const { error } = pacienteSchema.update.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const paciente = await pacientesModel.modificarPacienteModel(id, { dni, nombre, apellido, email });

      res.status(200).json(paciente);
    } catch (error) {
      res.status(400).json({ error: 'Hubo un error al actualizar el paciente' });
    }
  }
}

module.exports = new PacientesController();