const initProducto = require('./entities/producto.entity');

function createProductoModel(sequelize) {
  const Producto = initProducto(sequelize);

  // Método para obtener todos los productos filtrados por usuario
  Producto.getProductos = async (idUsuario) => {
  // Validar que idUsuario existe
  if (!idUsuario) {
    throw new Error('idUsuario es requerido');
  }
  
  return await Producto.findAll({
    where: {
      activo: true,
      idUsuario: idUsuario
    },
    order: [['nombre', 'ASC']]
  });
};

  // Método para obtener un producto por ID filtrado por usuario
  Producto.getProductoById = async (id, idUsuario) => {
    return await Producto.findOne({
      where: { 
        id: id,
        idUsuario: idUsuario,
        activo: true 
      }
    });
  };

  // Método para agregar un nuevo producto
  Producto.agregarProducto = async (datosProducto) => {
    return await Producto.create(datosProducto);
  };

  // Método para actualizar un producto filtrado por usuario
  Producto.actualizarProducto = async (id, datosActualizacion, idUsuario) => {
    const [numActualizados] = await Producto.update(datosActualizacion, {
      where: {
        id: id,
        idUsuario: idUsuario
      }
    });
    
    // Retornar el número de filas actualizadas y el producto actualizado
    if (numActualizados > 0) {
      const productoActualizado = await Producto.findOne({
        where: {
          id: id,
          idUsuario: idUsuario
        }
      });
      return [numActualizados, productoActualizado];
    }
  
    return [0, null];
  };

  // Método para eliminar un producto filtrado por usuario
  Producto.eliminarProducto = async (id, idUsuario) => {
    await Producto.update({ activo: false }, {
      where: { 
        id: id,
        idUsuario: idUsuario 
      }
    });
    return { mensaje: 'Producto eliminado correctamente' };
  };

  return Producto;
}

module.exports = createProductoModel;