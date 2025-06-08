const { Paciente } = require('../sqlite/entities/paciente.entity.js');

async function getPacientesModel() {
  try {
    const pacientes = await Paciente.findAll();
    if (pacientes.length === 0) throw new Error('no hay pacientes');
    return pacientes;
  } catch (error) {
    throw error;
  }
}

async function crearPacienteModel({ dni, nombre, apellido, email }) {
  try {                          //uso de los metodos del orm
    const existe = await Paciente.findOne({ where: { dni } });
    if (existe) throw new Error('El paciente ya existe');
                            //uso de los metodos del orm
    const nuevoPaciente = await Paciente.create({ dni, nombre, apellido, email });
    return nuevoPaciente;
  } catch (error) {
    throw error;
  }
}

async function borrarPacienteModel(id) {
  try {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) throw new Error('Paciente no encontrado');

    await paciente.destroy();
    return paciente;
  } catch (error) {
    throw error;
  }
}

async function modificarPacienteModel(id, { nombre, apellido, email }) {
  try {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) throw new Error('Paciente no encontrado');
    
    paciente.nombre = nombre;
    paciente.apellido = apellido;
    paciente.email = email;

    await paciente.save();
    return paciente;
  } catch (error) {
    throw error;
  }
}

module.exports = {getPacientesModel,crearPacienteModel,borrarPacienteModel,modificarPacienteModel
};