const {Categoria} = require('../models/index.js');

class CategoriaController {
    async getCategorias(req, res) {
        try {
        const categorias = await Categoria.getCategorias(req.user.userId);
        res.status(200).json(categorias);
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    }

    async getCategoriaById(req, res) {
    try {
      const { id } = req.params;
      const categoria = await Categoria.getCategoriaById(id, req.user.userId);
      if (!categoria) {
        return res.status(404).json({ message: 'Categoria no encontrado' });
      }
      res.status(200).json(categoria);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    }

    async agregarCategoria(req, res) {
    try {
      const nuevaCategoria = await Categoria.agregarCategoria(req.body);
      res.status(201).json(nuevaCategoria);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    }

    async actualizarCategoria(req, res) {
    try {
      const { id } = req.params;
      const [actualizados] = await Categoria.actualizarCategoria(id, req.body, req.user.userId);
      if (actualizados === 0) {
        return res.status(404).json({ message: 'Categoria no encontrada o sin cambios' });
      }
      res.status(200).json({ message: 'Categoria actualizada correctamente' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    }

    async eliminarCategoria(req, res) {
    try {
      const { id } = req.params;
      const eliminados = await Categoria.eliminarCategoria(id, req.user.userId);
      if (eliminados === 0) {
        return res.status(404).json({ message: 'Categoria no encontrado' });
      }
      res.status(200).json({ message: 'Categoria eliminado correctamente' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    }
}

module.exports = new CategoriaController();
