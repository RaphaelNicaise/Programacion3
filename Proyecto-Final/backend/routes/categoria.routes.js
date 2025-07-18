const {Router} = require('express');
const router = Router();
const {authenticateToken} = require('../middleware/usuarioMiddleware.js')
const categoriaController = require('../controllers/categoria.controller.js');

router.get('/',authenticateToken, categoriaController.getCategorias); //
router.get('/:id',authenticateToken, categoriaController.getCategoriaById); //
router.post('/',authenticateToken, categoriaController.agregarCategoria); //
router.put('/:id',authenticateToken, categoriaController.actualizarCategoria); //
router.delete('/:id',authenticateToken, categoriaController.eliminarCategoria); //

module.exports = router;
