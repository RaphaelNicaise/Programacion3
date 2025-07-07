const Joi = require('joi')

const pacienteSchema = {
    create: Joi.object({
        id: Joi.number().integer().positive().required().messages({
            'number.base': 'ID debe ser un numero',
            'number.integer': 'ID debe ser un numero entero',
            'number.positive': 'ID debe ser un numero entero positivo',
            'any.required': 'ID es requerido',
        }),
        dni: Joi.string().pattern(/^\d+$/).required().min(8).max(8).messages({
            'string.pattern.base': 'dni debe contener un numero positivo de 8 digitos',
            'any.required': 'dni es requerido',
        }),
        nombre: Joi.string().required().messages({
            'string.pattern.base': 'nombre debe contener una cadena de texto',
            'any.required': 'nombre es requerido',
        }),
        apellido: Joi.string().required().messages({
            'string.pattern.base': 'apellido debe contener una cadena de texto',
            'any.required': 'apellido es requerido',
        }),
        email: Joi.string().email().required().messages({
            'string.pattern.base': 'email debe contener una cadena de texto',
            'string.email': 'email debe contener una cadena de texto en formato de email',
            'any.required': 'email es requerido',
        }),
    }),

    update: Joi.object({
        dni: Joi.string().pattern(/^\d+$/).required().min(8).max(8).messages({
            'string.pattern.base': 'dni debe contener un numero positivo de 8 digitos',
            'any.required': 'dni es requerido',
        }),
        nombre: Joi.string().required().messages({
            'string.pattern.base': 'nombre debe contener una cadena de texto',
            'any.required': 'nombre es requerido',
        }),
        apellido: Joi.string().required().messages({
            'string.pattern.base': 'apellido debe contener una cadena de texto',
            'any.required': 'apellido es requerido',
        }),
        email: Joi.string().email().required().messages({
            'string.pattern.base': 'email debe contener una cadena de texto',
            'string.email': 'email debe contener una cadena de texto en formato de email',
            'any.required': 'email es requerido',
        }),
    }),
}

module.exports = {
    pacienteSchema
}