// backend/models/movimiento.model.js
const initMovimiento = require('./entities/movimiento.entity.js');

function createMovimientoModel(sequelize) {
  const Movimiento = initMovimiento(sequelize);

  // Método para obtener todos los movimientos filtrados por usuario
  Movimiento.getMovimientos = async (idUsuario) => {
    // Validar que idUsuario existe
    if (!idUsuario) {
      throw new Error('idUsuario es requerido');
    }
    
    return await Movimiento.findAll({
      where: {
        idUsuario: idUsuario
      },
      order: [['fecha', 'DESC']] // Ordenar por fecha más reciente
    });
  };

  // Método para obtener un movimiento por ID filtrado por usuario
  Movimiento.getMovimientoById = async (id, idUsuario) => {
    return await Movimiento.findOne({
      where: { 
        id: id,
        idUsuario: idUsuario
      }
    });
  };

  // Método para agregar un nuevo movimiento (básico)
  Movimiento.agregarMovimiento = async (datosMovimiento) => {
    return await Movimiento.create(datosMovimiento);
  };

  Movimiento.crearMovimientoConStock = async (datosMovimiento) => {
    const transaction = await sequelize.transaction();
    
    try {
        const { Producto } = require('./index');

        const producto = await Producto.findByPk(datosMovimiento.idProducto, { transaction });
        if (!producto) {
            throw new Error('Producto no encontrado');
        }

        if (producto.idUsuario !== datosMovimiento.idUsuario) {
            throw new Error('No tienes permisos para modificar este producto');
        }

        let nuevoStock = producto.stock;

        switch (datosMovimiento.tipo) {
            case 'entrada':
                nuevoStock += datosMovimiento.cantidad;
                break;
                console.log('Ya se actualizó el stock')
            case 'salida':
                if (producto.stock < datosMovimiento.cantidad) {
                    throw new Error('Stock insuficiente para esta salida');
                }
                nuevoStock -= datosMovimiento.cantidad;
                break;
            case 'ajuste':
                nuevoStock = datosMovimiento.cantidad;
                break;
            default:
                throw new Error('Tipo de movimiento no válido');
        }

        // Actualiza el stock usando la firma correcta del método
        const [numActualizados, productoActualizado] = await Producto.actualizarProducto(
            datosMovimiento.idProducto,
            { stock: nuevoStock },
            datosMovimiento.idUsuario
        );


        if (numActualizados === 0) {
            throw new Error('No se pudo actualizar el stock del producto');
        }

        const movimiento = await Movimiento.create(datosMovimiento, { transaction });

        await transaction.commit();
        return movimiento;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

  return Movimiento;
}

module.exports = createMovimientoModel;