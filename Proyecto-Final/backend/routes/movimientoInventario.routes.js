const { Router } = require('express');
const movimientoInventarioController = require('../controllers/movimientoInventarioController.js');
const router = Router();

// Rutas principales de movimientos
router.get('/', movimientoInventarioController.getMovimientos);
router.get('/producto/:producto_id', movimientoInventarioController.getMovimientosByProducto);
router.get('/:id', movimientoInventarioController.getMovimiento);

// Creación de movimientos
router.post('/', movimientoInventarioController.createMovimiento);

module.exports = router;
