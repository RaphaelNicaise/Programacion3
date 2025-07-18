// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Misma clave secreta que usas en el login
const secretWord = process.env.JWT_SECRET; //Antes: 'palabra' (hardcodeado)

const authenticateToken = (req, res, next) => {
  // Debug: mostrar todos los headers
  console.log('Headers recibidos:', req.headers);
  
  // Obtener el token del header Authorization
  const authHeader = req.headers['authorization'];
  console.log('Authorization header:', authHeader);
  
  let token;

  if (authHeader) {
    // Si empieza con "Bearer ", extraer el token
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else {
      // Si no tiene "Bearer ", usar todo el header como token
      token = authHeader;
    }
  }

  console.log('Token extraído:', token);

  if (!token) {
    return res.status(401).json({ error: 'Token de acceso requerido' });
  }

  jwt.verify(token, secretWord, (err, user) => {
    console.log('Error en JWT verify:', err);
    console.log('Usuario decodificado:', user);
    
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
    
    // Agregar la información del usuario al request
    req.user = user;
    console.log('Usuario agregado a req.user:', req.user);
    next();
  });
};

// Middleware para verificar roles específicos
const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'No tienes permisos suficientes' });
    }

    next();
  };
};

// Middleware para verificar usuario específico
const requireUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  // Verificar si el usuario puede acceder a sus propios datos
  const requestedUserId = req.params.userId || req.body.userId;
  
  if (req.user.role !== 'admin' && req.user.userId !== requestedUserId) {
    return res.status(403).json({ error: 'Solo puedes acceder a tus propios datos' });
  }

  next();
};

module.exports = {
  authenticateToken,
  requireRole,
  requireUser
};