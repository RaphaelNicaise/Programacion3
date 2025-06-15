const {personasDataBase} = require('../sqlite/entities/persona.entity.js');

async function getPersonasModel() {
  try {
    const getPersonas = await personasDataBase.findAll();
    return getPersonas;
  } catch (error) {
    throw error;
  }
}

module.exports = {getPersonasModel};