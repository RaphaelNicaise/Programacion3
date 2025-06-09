const { getAllTurnosPacienteModel, crearTurnoModel, borrarTurnoModel } = require('../../models/sqlite/turno.model.js');

class turnosViewController {
    getTurnosView = async (req, res) => {
        try {
            const showTurnos = await getAllTurnosPacienteModel();

            res.render('turnos', {
                turnos: showTurnos,
                title: "Gestion de Pacientes - CLINICA",
                message: 'Control de pacientes y turnos',
                error: null,
            });

        } catch (error) {
            res.render('turnos', {
                title: "Gestion de Pacientes - CLINICA",
                message: 'Control de pacientes y turnos',
                error: null,
                turnos: [],
            })
            console.log('Hubo un error: ', error)
        }
    };

    async crearTurno(req, res) {
        try {
            const { fecha, hora, pacienteId, motivo } = req.body;
            if (!fecha || !hora || !motivo || !pacienteId) {
                throw new Error('Faltan datos obligatorios: fecha, hora, motivo y pacienteId');
            }

            const nuevoTurno = await crearTurnoModel({ fecha, hora, motivo, pacienteId });
            res.redirect('/')
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    async borrarTurno(req, res) {
        const { idTurno } = req.body;
        
        try {
            const turno = await borrarTurnoModel(idTurno);
            res.redirect('/turnos')
        } catch (error) {
            res.render('error-turno', {
                title: "Gestion de Pacientes - CLINICA",
                message: 'Control de pacientes y turnos',
                error: `EL TURNO CON EL ID ${idTurno} NO EXISTE`
            })
        }
    }

}


module.exports = new turnosViewController()

