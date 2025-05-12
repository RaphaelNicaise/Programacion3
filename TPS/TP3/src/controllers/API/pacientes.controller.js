// refactorizar a servicios
const {getPacientesModel} = require('../../models/sqlite/paciente.model.js')

// controladores
const getPacientes = async (req, res) => {
    // codigo de exito y codigo de error
    res.json(await getPacientesModel());
}
module.exports = {
    getPacientes
}




