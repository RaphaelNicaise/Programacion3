const { Op } = require('sequelize');
const { MovimientoInventario, Producto, Categoria } = require('./index');

class MovimientoInventarioModel {
    static async crear(datosMovimiento) {
        const {
            producto_id,
            tipo_movimiento,
            cantidad
        } = datosMovimiento;

        // Validar que el producto existe
        const producto = await Producto.findByPk(producto_id);
        if (!producto) throw new Error('El producto especificado no existe');

        // Validar cantidad
        if (!cantidad || cantidad <= 0) throw new Error('La cantidad debe ser mayor a 0');

        // Validar tipo de movimiento
        const tiposPermitidos = ['entrada', 'salida', 'ajuste'];
        if (!tiposPermitidos.includes(tipo_movimiento)) {
            throw new Error(`Tipo de movimiento no válido. Permitidos: ${tiposPermitidos.join(', ')}`);
        }

        const stockAnterior = producto.stock_actual;
        let stockNuevo;

        // Calcular nuevo stock según tipo de movimiento
        switch (tipo_movimiento) {
            case 'entrada':
                stockNuevo = stockAnterior + parseInt(cantidad);
                break;
            case 'salida':
                if (stockAnterior < cantidad) {
                    throw new Error(`Stock insuficiente. Stock actual: ${stockAnterior}, cantidad solicitada: ${cantidad}`);
                }
                stockNuevo = stockAnterior - parseInt(cantidad);
                break;
            case 'ajuste':
                stockNuevo = parseInt(cantidad);
                break;
            default:
                throw new Error('Tipo de movimiento no válido');
        }

        // Validar que el stock nuevo no sea negativo
        if (stockNuevo < 0) {
            throw new Error('El stock resultante no puede ser negativo');
        }

        // Calcular valores monetarios
        const precioUnitario = producto.precio || 0;
        const valorTotal = Math.abs(cantidadMovimiento) * precioUnitario;

        // Crear transacción para asegurar consistencia
        const resultado = await MovimientoInventario.sequelize.transaction(async (transaction) => {
            // Crear el movimiento
            const movimiento = await MovimientoInventario.create({
                producto_id: parseInt(producto_id),
                tipo_movimiento,
                cantidad: Math.abs(cantidadMovimiento),
                stock_anterior: stockAnterior,
                stock_nuevo: stockNuevo,
                precio_unitario: precioUnitario,
                valor_total: valorTotal,
                motivo: motivo?.trim() || null,
                observaciones: observaciones?.trim() || null,
                fecha_movimiento: new Date()
            }, { transaction });

            // Actualizar el stock del producto
            await producto.update({
                stock_actual: stockNuevo
            }, { transaction });

            return movimiento;
        });

        return {
            success: true,
            data: resultado,
            message: `Movimiento de ${tipo_movimiento} registrado exitosamente`,
            stock_info: {
                stock_anterior: stockAnterior,
                stock_nuevo: stockNuevo,
                diferencia: cantidadMovimiento
            }
        };
    }

    static async obtenerTodos() {
        const movimientos = await MovimientoInventario.findAll({
            include: [{
                model: Producto,
                as: 'producto',
                attributes: ['id', 'nombre', 'codigo'],
                include: [{
                    model: Categoria,
                    as: 'categoria',
                    attributes: ['id', 'nombre']
                }]
            }],
            order: [['fecha_movimiento', 'DESC']]
        });

        return {
            success: true,
            data: movimientos,
            total: movimientos.length
        };
    }

    static async buscarPorId(id) {
        const movimiento = await MovimientoInventario.findByPk(id, {
            include: [{
                model: Producto,
                as: 'producto',
                attributes: ['id', 'nombre', 'codigo', 'precio'],
                include: [{
                    model: Categoria,
                    as: 'categoria',
                    attributes: ['id', 'nombre']
                }]
            }]
        });

        if (!movimiento) return { success: false, message: 'Movimiento no encontrado' };
        return { success: true, data: movimiento };
    }

    static async obtenerPorProducto(producto_id) {
        const producto = await Producto.findByPk(producto_id);
        if (!producto) throw new Error('Producto no encontrado');

        const movimientos = await MovimientoInventario.findAll({
            where: { producto_id },
            order: [['fecha_movimiento', 'DESC']]
        });

        return {
            success: true,
            data: movimientos,
            producto: {
                id: producto.id,
                nombre: producto.nombre,
                codigo: producto.codigo,
                stock_actual: producto.stock_actual
            },
            total: movimientos.length
        };
    }
}

module.exports = MovimientoInventarioModel;
