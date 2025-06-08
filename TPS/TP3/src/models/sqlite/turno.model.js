const { Turno } = require('../sqlite/entities/turno.entity.js');

async function getAllTurnosPacienteModel() {
  try {
    const turnos = await Turno.findAll();
    if (turnos.length === 0) throw new Error('No hay turnos');
    return turnos;
  } catch (error) {
    throw error;
  }
}

async function getTurnosPacienteModel(idPaciente) {
  try {
    const turnos = await Turno.findAll({ where: { pacienteId: idPaciente } });
    if (turnos.length === 0) throw new Error('No hay turnos para ese paciente');
    return turnos;
  } catch (error) {
    throw error;
  }
}

async function borrarTurnoModel(idTurno) {
  try {
    const turno = await Turno.findByPk(idTurno);
    if (!turno) throw new Error('Turno no encontrado');
    await turno.destroy();
    return turno;
  } catch (error) {
    throw error;
  }
}

async function crearTurnoModel({ fecha, hora, motivo, pacienteId }) {
  try {
    if (!fecha || !hora || !motivo || !pacienteId) {
      throw new Error('Faltan datos obligatorios: fecha, hora, motivo y pacienteId');
    }

    const nuevoTurno = await Turno.create({ fecha, hora, motivo, pacienteId });
    return nuevoTurno;
  } catch (error) {
    throw error;
  }
}

module.exports = {getAllTurnosPacienteModel,getTurnosPacienteModel,borrarTurnoModel,crearTurnoModel
};