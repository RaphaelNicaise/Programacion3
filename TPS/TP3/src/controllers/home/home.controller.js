// controladores
const home = async (req, res) => {
    res.render('index', {
        title: "Gestion de Pacientes - CLINICA",
        message: 'Control de pacientes y turnos'
    });
}

module.exports = {
    home,
}