const Joi = require('joi')

const turnoSchema = {
    create: Joi.object({
        fecha: Joi.string().date().required().messages({

        }),
        hora: Joi.string().pattern(/^([01]\d|2[0-3]):[0-5]\d$/).required().messages({

        }),
        motivo: Joi.string().max(40).required().messages({

        }),
        pacienteId: Joi.number().integer().positive().max(3).required()
    }),

    update: Joi.object({
    }),
}

module.exports = { 
    turnoSchema 
}