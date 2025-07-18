const { DataTypes, Model } = require('sequelize');

class Categoria extends Model {}

function initCategoria(sequelize) {
  Categoria.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING
    },
    idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: true //puede ser null si algunas son globales
    }
  }, {
    sequelize,
    modelName: 'Categoria',
    tableName: 'categorias',
    timestamps: false
  });

  return Categoria;
}

module.exports = initCategoria;
