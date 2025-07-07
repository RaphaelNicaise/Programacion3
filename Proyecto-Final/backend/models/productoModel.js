const { Op } = require('sequelize');
const { Producto, Categoria } = require('./index');

class ProductoModel {
    static async crear(datosProducto) {
        const { nombre, codigo, descripcion, precio, stock_actual, stock_minimo, categoria_id } = datosProducto;

        // Validar que la categoría existe
        const categoria = await Categoria.findByPk(categoria_id);
        if (!categoria) throw new Error('La categoría especificada no existe');

        // Validar que el código no existe
        const existe = await Producto.findOne({ where: { codigo: codigo.trim() } });
        if (existe) throw new Error(`Ya existe un producto con el código: ${codigo}`);

        // Validar precio y stock
        if (precio < 0) throw new Error('El precio no puede ser negativo');
        if (stock_actual < 0) throw new Error('El stock actual no puede ser negativo');
        if (stock_minimo < 0) throw new Error('El stock mínimo no puede ser negativo');

        const producto = await Producto.create({
            nombre: nombre.trim(),
            codigo: codigo.trim().toUpperCase(),
            descripcion: descripcion?.trim() || null,
            precio: parseFloat(precio),
            stock_actual: parseInt(stock_actual),
            stock_minimo: parseInt(stock_minimo),
            categoria_id: parseInt(categoria_id)
        });

        return { success: true, data: producto, message: 'Producto creado exitosamente' };
    }

    static async obtenerTodos() {
        const productos = await Producto.findAll({
            include: [{
                model: Categoria,
                as: 'categoria',
                attributes: ['id', 'nombre']
            }],
            order: [['nombre', 'ASC']]
        });
        return { success: true, data: productos, total: productos.length };
    }

    static async buscarPorId(id) {
        const producto = await Producto.findByPk(id, {
            include: [{
                model: Categoria,
                as: 'categoria',
                attributes: ['id', 'nombre', 'descripcion']
            }]
        });
        if (!producto) return { success: false, message: 'Producto no encontrado' };
        return { success: true, data: producto };
    }

    static async actualizar(id, datos) {
        const producto = await Producto.findByPk(id);
        if (!producto) throw new Error('Producto no encontrado');

        // Validar categoría si se está cambiando
        if (datos.categoria_id && datos.categoria_id !== producto.categoria_id) {
            const categoria = await Categoria.findByPk(datos.categoria_id);
            if (!categoria) throw new Error('La categoría especificada no existe');
        }

        // Validar código único si se está cambiando
        if (datos.codigo && datos.codigo !== producto.codigo) {
            const existe = await Producto.findOne({ where: { codigo: datos.codigo.trim().toUpperCase() } });
            if (existe && existe.id !== id) throw new Error(`Ya existe un producto con el código: ${datos.codigo}`);
        }

        // Validaciones
        if (datos.precio !== undefined && datos.precio < 0) {
            throw new Error('El precio no puede ser negativo');
        }
        if (datos.stock_actual !== undefined && datos.stock_actual < 0) {
            throw new Error('El stock actual no puede ser negativo');
        }
        if (datos.stock_minimo !== undefined && datos.stock_minimo < 0) {
            throw new Error('El stock mínimo no puede ser negativo');
        }

        await producto.update({
            nombre: datos.nombre?.trim() || producto.nombre,
            codigo: datos.codigo?.trim().toUpperCase() || producto.codigo,
            descripcion: datos.descripcion?.trim() || producto.descripcion,
            precio: datos.precio !== undefined ? parseFloat(datos.precio) : producto.precio,
            stock_actual: datos.stock_actual !== undefined ? parseInt(datos.stock_actual) : producto.stock_actual,
            stock_minimo: datos.stock_minimo !== undefined ? parseInt(datos.stock_minimo) : producto.stock_minimo,
            categoria_id: datos.categoria_id ? parseInt(datos.categoria_id) : producto.categoria_id,
            activo: datos.activo !== undefined ? datos.activo : producto.activo
        });

        return { success: true, data: producto, message: 'Producto actualizado exitosamente' };
    }

    static async eliminar(id) {
        const producto = await Producto.findByPk(id);
        if (!producto) throw new Error('Producto no encontrado');

        await producto.destroy();
        return { success: true, message: 'Producto eliminado exitosamente' };
    }

    static async buscarProductos(termino) {
        const productos = await Producto.findAll({
            where: {
                [Op.or]: [
                    { nombre: { [Op.iLike]: `%${termino.trim()}%` } },
                    { codigo: { [Op.iLike]: `%${termino.trim()}%` } }
                ]
            },
            include: [{
                model: Categoria,
                as: 'categoria',
                attributes: ['id', 'nombre']
            }],
            order: [['nombre', 'ASC']]
        });
        return { success: true, data: productos, total: productos.length };
    }
}

module.exports = ProductoModel;
