const { Op } = require('sequelize');
const { Categoria, Producto } = require('./index');

class CategoriaModel {
    static async crear(datosCategoria) {
        const { nombre, descripcion } = datosCategoria;
        const existe = await Categoria.findOne({ where: { nombre: { [Op.iLike]: nombre.trim() } } });
        if (existe) throw new Error(`Ya existe una categoría con el nombre: ${nombre}`);
        const categoria = await Categoria.create({ nombre: nombre.trim(), descripcion: descripcion?.trim() });
        return { success: true, data: categoria, message: 'Categoría creada exitosamente' };
    }

    static async obtenerTodas() {
        const categorias = await Categoria.findAll({
            order: [['nombre', 'ASC']]
        });
        return { success: true, data: categorias, total: categorias.length };
    }

    static async buscarPorId(id) {
        const categoria = await Categoria.findByPk(id);
        if (!categoria) return { success: false, message: 'Categoría no encontrada' };
        return { success: true, data: categoria };
    }

    static async actualizar(id, datos) {
        const categoria = await Categoria.findByPk(id);
        if (!categoria) throw new Error('Categoría no encontrada');
        if (datos.nombre && datos.nombre !== categoria.nombre) {
            const existe = await Categoria.findOne({ where: { nombre: { [Op.iLike]: datos.nombre.trim() } } });
            if (existe && existe.id !== id) throw new Error(`Ya existe una categoría con el nombre: ${datos.nombre}`);
        }
        await categoria.update({
            nombre: datos.nombre?.trim() || categoria.nombre,
            descripcion: datos.descripcion?.trim() || categoria.descripcion
        });
        return { success: true, data: categoria, message: 'Categoría actualizada exitosamente' };
    }

    static async eliminar(id) {
        const categoria = await Categoria.findByPk(id);
        if (!categoria) throw new Error('Categoría no encontrada');
        await categoria.destroy();
        return { success: true, message: 'Categoría eliminada exitosamente' };
    }
}

module.exports = CategoriaModel;
