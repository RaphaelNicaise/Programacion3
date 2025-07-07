const categoriaModel = require('../models/categoriaModel.js');

class CategoriaController {
    async getCategorias(req, res) {
        try {
            const resultado = await categoriaModel.obtenerTodas();
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async getCategoria(req, res) {
        try {
            const { id } = req.params;
            const resultado = await categoriaModel.buscarPorId(id);
            if (!resultado.success) {
                return res.status(404).json({ success: false, message: resultado.message });
            }
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async createCategoria(req, res) {
        try {
            const resultado = await categoriaModel.crear(req.body);
            res.status(201).json(resultado);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async updateCategoria(req, res) {
        try {
            const { id } = req.params;
            const resultado = await categoriaModel.actualizar(id, req.body);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async deleteCategoria(req, res) {
        try {
            const { id } = req.params;
            const resultado = await categoriaModel.eliminar(id);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}

module.exports = new CategoriaController();