const { DataTypes, Model } = require('sequelize');

class Movimiento extends Model {}

function initMovimiento(sequelize) {
  Movimiento.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo: {
      type: DataTypes.ENUM('entrada', 'salida', 'ajuste'),
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    observaciones: {
      type: DataTypes.STRING
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    idProducto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idProveedor: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Movimiento',
    tableName: 'movimientos',
    timestamps: false
  });

  return Movimiento;
}

module.exports = initMovimiento;
