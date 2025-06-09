const turnosModel = require('../../models/sqlite/turno.model.js');
const pacientesModel = require('../../models/sqlite/paciente.model.js')
const { turnoSchema } =require('../../schemas/turno.schema.js')
class TurnosController {

  async getAllTurnos(req, res) {
    try {
      const turnos = await turnosModel.getAllTurnosPacienteModel();
      res.status(200).json(turnos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTurnos(req, res) {
    try {
      const { idPaciente } = req.params;
      const turnos = await turnosModel.getTurnosPacienteModel(idPaciente);
      res.status(200).json(turnos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async borrarTurno(req, res) {
    try {
      const { idTurno } = req.params;
      const turno = await turnosModel.borrarTurnoModel(idTurno);
      res.status(200).json({
        'mensaje': 'ID turno ' + idTurno + ' eliminado satisfactoriamente',
        'turnoEliminado': turno
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async crearTurno(req, res) {
    try {
      const { error } = turnoSchema.create.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const { fecha, hora, motivo, pacienteId } = req.body;
      const pacientes = await pacientesModel.getPacientesModel()

      if (!fecha || !hora || !motivo || !pacienteId) {
        throw new Error('Faltan datos obligatorios: fecha, hora, motivo y pacienteId')
      }
      
      const existePaciente = pacientes.some(p => p.dataValues.id === Number(pacienteId))

      if (!existePaciente) {
        res.status(400).json({ "error": "No existe ningun paciente con ese ID" })
        return
      }

      const nuevoTurno = await turnosModel.crearTurnoModel({ fecha, hora, motivo, pacienteId });
      res.status(201).json(nuevoTurno);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new TurnosController();
