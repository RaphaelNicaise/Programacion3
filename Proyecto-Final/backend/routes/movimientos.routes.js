const {Router} = require('express');
const router = Router();
const {authenticateToken} = require('../middleware/usuarioMiddleware.js')
const movimientoController = require('../controllers/movimiento.controller.js');

router.get('/',authenticateToken, movimientoController.getMovimientos);
router.get('/:id',authenticateToken, movimientoController.getMovimientoById);
router.post('/',authenticateToken, movimientoController.agregarMovimiento);

module.exports = router;
