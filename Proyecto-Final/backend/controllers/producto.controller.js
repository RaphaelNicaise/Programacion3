const {Producto} = require('../models/index.js');

class ProductoController {
    async getProductos(req, res) {
        try {
        const productos = await Producto.getProductos(req.user.userId);
        res.status(200).json(productos);
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    }

    async getProductoById(req, res) {
    try {
      const { id } = req.params;
      const producto = await Producto.getProductoById(id, req.user.userId);
      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.status(200).json(producto);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    }

    async agregarProducto(req, res) {
    try {
      const nuevoProducto = await Producto.agregarProducto(req.body);
      res.status(201).json(nuevoProducto);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    }

    async actualizarProducto(req, res) {
    try {
      const { id } = req.params;
      const [actualizados] = await Producto.actualizarProducto(id, req.body, req.user.userId);
      if (actualizados === 0) {
        return res.status(404).json({ message: 'Producto no encontrado o sin cambios' });
      }
      res.status(200).json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    }

    async eliminarProducto(req, res) {
    try {
      const { id } = req.params;
      const eliminados = await Producto.eliminarProducto(id, req.user.userId);
      if (eliminados === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    }
}

module.exports = new ProductoController();
