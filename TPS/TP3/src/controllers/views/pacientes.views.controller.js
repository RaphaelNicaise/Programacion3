const { getPacientesModel, borrarPacienteModel, crearPacienteModel } = require('../../models/sqlite/paciente.model.js');

class PacientesViewController {
  getPacientesView = async (req, res) => {
    try {
      const showPacientes = await getPacientesModel();

      res.render('pacientes', {
        pacientes: showPacientes,
        title: "Gestion de Pacientes - CLINICA",
        message: 'Control de pacientes y turnos',
        error: null,
      });

    } catch (error) {
      res.render('pacientes', {
        title: "Gestion de Pacientes - CLINICA",
        message: 'Control de pacientes y turnos',
        error: null,
        pacientes: [],
      })
      console.log('Hubo un error: ', error)
    }
  };

  crearPaciente = async (req, res) => {
    try {
      const { dniPaciente, nombrePaciente, apellidoPaciente, emailPaciente } = req.body;

      if (!dniPaciente || !nombrePaciente || !apellidoPaciente || !emailPaciente) {
        throw new Error('Faltan datos obligatorios: fecha, hora, motivo y pacienteId');
      }

      const nuevoPaciente = await crearPacienteModel({ dniPaciente, nombrePaciente, apellidoPaciente, emailPaciente });
      res.redirect('/')
      res.status(201).json(nuevoPaciente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  borrarPaciente = async (req, res) => {
    const id = req.body.idPacienteEliminar;

    try {
      const paciente = await borrarPacienteModel(id);
      res.redirect('/pacientes',)
    } catch (error) {
      res.render('error-turno', {
        title: "Gestion de Pacientes - CLINICA",
        message: 'Control de pacientes y turnos',
        error: `EL PACIENTE CON EL ID ${id} INGRESADO NO EXISTE`
      })
    }
  }
}

module.exports = new PacientesViewController();