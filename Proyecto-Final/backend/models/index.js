const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions
  }
);

//Importo entidades
const CategoriaEntity = require('./entities/categoriaEntity');
const ProductoEntity = require('./entities/productoEntity');
const MovimientoInventarioEntity = require('./entities/movimientoInventarioEntity');

//Inicializo entities
const Categoria = CategoriaEntity(sequelize);
const Producto = ProductoEntity(sequelize);
const MovimientoInventario = MovimientoInventarioEntity(sequelize);

//Defino las asociaciones entre tablas
const models = { Categoria, Producto, MovimientoInventario };

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  sequelize,
  Sequelize,
  Categoria,
  Producto,
  MovimientoInventario
};