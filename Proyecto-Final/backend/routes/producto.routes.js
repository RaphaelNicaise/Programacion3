const {Router} = require('express');
const router = Router();
const {authenticateToken} = require('../middleware/usuarioMiddleware.js')

const productoController = require('../controllers/producto.controller.js');

router.get('/',authenticateToken, productoController.getProductos);
router.get('/:id',authenticateToken, productoController.getProductoById);
router.post('/',authenticateToken, productoController.agregarProducto);
router.put('/:id',authenticateToken, productoController.actualizarProducto);
router.delete('/:id',authenticateToken, productoController.eliminarProducto);

module.exports = router;
