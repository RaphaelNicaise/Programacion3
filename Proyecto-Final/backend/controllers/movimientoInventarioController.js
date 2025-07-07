const movimientoInventarioModel = require('../models/movimientoInventarioModel.js');

class MovimientoInventarioController {
    async getMovimientos(req, res) {
        try {
            const resultado = await movimientoInventarioModel.obtenerTodos();
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async getMovimiento(req, res) {
        try {
            const { id } = req.params;
            const resultado = await movimientoInventarioModel.buscarPorId(id);
            if (!resultado.success) {
                return res.status(404).json({ success: false, message: resultado.message });
            }
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async createMovimiento(req, res) {
        try {
            const resultado = await movimientoInventarioModel.crear(req.body);
            res.status(201).json(resultado);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async getMovimientosByProducto(req, res) {
        try {
            const { producto_id } = req.params;
            const resultado = await movimientoInventarioModel.obtenerPorProducto(producto_id);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}

module.exports = new MovimientoInventarioController();