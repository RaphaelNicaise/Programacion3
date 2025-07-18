// backend/models/categoria.model.js
const initCategoria = require('./entities/categoria.entity.js');

function createCategoriaModel(sequelize) {
  const Categoria = initCategoria(sequelize);

  // Método para obtener todas las categorias filtrados por usuario
  Categoria.getCategorias = async (idUsuario) => {
  // Validar que idUsuario existe
  if (!idUsuario) {
    throw new Error('idUsuario es requerido');
  }
  
  return await Categoria.findAll({
    where: {
      idUsuario: idUsuario
    },
    order: [['nombre', 'ASC']]
  });
};

  // Método para obtener una categoria por ID filtrado por usuario
  Categoria.getCategoriaById = async (id, idUsuario) => {
    return await Categoria.findOne({
      where: { 
        id: id,
        idUsuario: idUsuario
      }
    });
  };

  // Método para agregar una nueva categoria
  Categoria.agregarCategoria = async (datosCategoria) => {
    return await Categoria.create(datosCategoria);
  };

  // Método para actualizar una categoria filtrada por usuario
  Categoria.actualizarCategoria = async (id, datosActualizacion, idUsuario) => {
    const [numActualizados] = await Categoria.update(datosActualizacion, {
      where: {
        id: id,
        idUsuario: idUsuario
      }
    });
    
    // Retornar el número de filas actualizadas y la categoria actualizado
    if (numActualizados > 0) {
      const categoriaActualizada = await Categoria.findOne({
        where: {
          id: id,
          idUsuario: idUsuario
        }
      });
      return [numActualizados, categoriaActualizada];
    }
  
    return [0, null];
  };

  // Método para eliminar una categoria filtrada por usuario
  Categoria.eliminarCategoria = async (id, idUsuario) => {
  const resultado = await Categoria.destroy({
    where: { 
      id: id,
      idUsuario: idUsuario 
    }
  });

  if (resultado === 0) {
    throw new Error('Categoria no encontrada o no autorizada');
  }
  
  return { mensaje: 'Categoria eliminada correctamente' };
  };

  return Categoria;
}

module.exports = createCategoriaModel;