const { Router } = require('express');
const productoController = require('../controllers/productoController.js');
const router = Router();

// Rutas principales de productos
router.get('/', productoController.getProductos);
router.get('/buscar', productoController.buscarProductos);
router.get('/:id', productoController.getProducto);
router.post('/', productoController.createProducto);
router.put('/:id', productoController.updateProducto);
router.delete('/:id', productoController.deleteProducto);

module.exports = router;
