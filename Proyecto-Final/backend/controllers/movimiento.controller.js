const {Movimiento} = require('../models/index.js');

class MovimientoController {
    async getMovimientos(req, res) {
        try {
        const movimientos = await Movimiento.getMovimientos(req.user.userId);
        res.status(200).json(movimientos);
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    }

    async getMovimientoById(req, res) {
    try {
      const { id } = req.params;
      const movimiento = await Movimiento.getMovimientoById(id, req.user.userId);
      if (!movimiento) {
        return res.status(404).json({ message: 'Movimiento no encontrado' });
      }
      res.status(200).json(movimiento);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    }

    async agregarMovimiento(req, res) {
    try {
      const nuevoMovimiento = await Movimiento.crearMovimientoConStock(req.body);
      res.status(201).json(nuevoMovimiento);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    }
}

module.exports = new MovimientoController();
