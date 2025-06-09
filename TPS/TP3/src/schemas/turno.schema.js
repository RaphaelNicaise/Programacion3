const Joi = require('joi')

const turnoSchema = {
    create: Joi.object({
        fecha: Joi.date().iso().required().messages({
            'date.format': 'La fecha debe tener el YYYY-MM-DD',
            'any.required': 'La fecha es obligatoria.'
        }),
        hora: Joi.string().pattern(/^([01]\d|2[0-3]):[0-5]\d$/).required().messages({

        }),
        motivo: Joi.string().max(40).required().messages({
            'string.pattern.base': 'El motivo debe ser un string'
        }),
        pacienteId: Joi.number().integer().positive().required()
    }),
}

module.exports = {
    turnoSchema
}