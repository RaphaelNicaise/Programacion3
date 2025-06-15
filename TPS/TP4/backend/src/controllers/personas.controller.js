const Config = require('../config/config.js');
const personaModel = require('../models/sqlite/persona.model.js');

class PersonasController {
    async getPersonas(req, res) {
        try {
        const personas = await personaModel.getPersonasModel();
        res.status(200).json(personas);
        } catch (error) {
        res.status(400).json({ message: error.message })
        }
    }
}

module.exports = new PersonasController();