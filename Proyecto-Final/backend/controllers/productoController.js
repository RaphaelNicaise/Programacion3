const productoModel = require('../models/productoModel.js');

class ProductoController {
    async getProductos(req, res) {
        try {
            const resultado = await productoModel.obtenerTodos();
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async getProducto(req, res) {
        try {
            const { id } = req.params;
            const resultado = await productoModel.buscarPorId(id);
            if (!resultado.success) {
                return res.status(404).json({ success: false, message: resultado.message });
            }
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async createProducto(req, res) {
        try {
            const resultado = await productoModel.crear(req.body);
            res.status(201).json(resultado);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async updateProducto(req, res) {
        try {
            const { id } = req.params;
            const resultado = await productoModel.actualizar(id, req.body);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async deleteProducto(req, res) {
        try {
            const { id } = req.params;
            const resultado = await productoModel.eliminar(id);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async buscarProductos(req, res) {
        try {
            const { termino } = req.query;
            if (!termino || termino.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'El parámetro termino es requerido'
                });
            }

            const resultado = await productoModel.buscarProductos(termino);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}

module.exports = new ProductoController();
