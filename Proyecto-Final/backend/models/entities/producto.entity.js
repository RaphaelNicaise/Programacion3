const { DataTypes, Model } = require('sequelize');
class Producto extends Model {}

function initProducto(sequelize) {
  Producto.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //descripcion: {
    //  type: DataTypes.STRING
    //},
    precioCompra: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    precioVenta: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    idCategoria: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false
    }

  }, {
    sequelize,
    modelName: 'Producto',
    tableName: 'productos',
    timestamps: false
  });

  return Producto;
}

module.exports = initProducto;
