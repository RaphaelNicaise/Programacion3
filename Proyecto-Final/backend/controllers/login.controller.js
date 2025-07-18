//LOGIN CONTROLLER SIN HASH
const Config = require('../config/config.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { LoginSchema } = require('../schemas/login.schema.js')
const { User } = require('../models/index.js');
const bcrypt = require('bcrypt');

// Cargar variables de entorno
dotenv.config();

class LoginController {
  
  async login(req, res) {
    const { username, password } = req.body;

    // Nuevo método con username y password
    if (!username || !password) {
      return res.status(400).json({ error: 'Usuario y contraseña son obligatorios' });
    }

    try {
      // Buscar el usuario en la base de datos
      const user = await User.findByCredentials(username, password);

      if (!user) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      // Valores HARDCODEADOS en lugar de usar Config o .env
      //const secretWord = 'mi_palabra_secreta_super_segura_2024';
      //const expiresIn = '24h';

      // Tengo que reemplazar el código hardcodeado con esto:
      const secretWord = process.env.JWT_SECRET;
      const expiresIn = process.env.JWT_EXPIRES_IN;

      // Crear token con información del usuario
      console.log('Creando token')
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          role: user.role,
          permissions: user.permissions
        },
        secretWord,
        { expiresIn: expiresIn }
      );

      res.status(200).json({
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          permissions: user.permissions
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  //--------------
  async signUp(req, res) {
  console.log('Llamando a User.crearUsuario desde el controlador');
  try {
    // Validar estructura con Joi
    /*const { error } = LoginSchema.login.validate({ username, password });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }*/

    const datosUsuario = req.body;
    console.log('Datos recibidos:', datosUsuario);

    const nuevoUsuario = await User.crearUsuario(datosUsuario);
    console.log('Usuario creado:', nuevoUsuario);

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      usuario: nuevoUsuario
    });
  } catch (error) {
    console.error('Error en signUp:', error);
    res.status(400).json({
      error: 'No se pudo crear el usuario',
      message: error.message
    });
  }
}

  // Método para obtener información del usuario actual
  async getCurrentUser(req, res) {
    // req.user viene del middleware de autenticación
    res.status(200).json({ user: req.user });
  }
}


module.exports = new LoginController();