const express = require('express');
const router = express.Router();

// Importo rutas
const productoRoutes = require('./producto.routes');
const loginRoutes = require('./login.routes');
const categoriaRoutes = require('./categoria.routes.js')
const movimientoRoutes = require('./movimientos.routes.js')

// Derivo rutas
router.use('/productos', productoRoutes);
router.use('/login', loginRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/movimientos', movimientoRoutes)

// Ruta de prueba
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta de ejemplo
router.get('/test', (req, res) => {
  res.json({
    message: 'Endpoint de prueba',
    data: {
      backend: 'Express',
      database: 'PostgreSQL',
      orm: 'Sequelize'
    }
  });
});

module.exports = router;
