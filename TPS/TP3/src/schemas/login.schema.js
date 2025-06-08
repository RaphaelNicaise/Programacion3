const Joi = require('joi')

const LoginSchema = {
    login: Joi.object({
        password: Joi.string().min(8).required().messages({
            'string.pattern.base': 'password debe contener al menos 8 caracteres',
            'string.min': 'password debe contener al menos 8 caracteres',
            'any.required': 'password es requerido',
        })
    })
}

module.exports = { LoginSchema }