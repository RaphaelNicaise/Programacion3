// backend/models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];


// Importar modelos
const productoModel = require('../models/producto.model')
const categoriaModel = require('./categoria.model.js')
const movimientoModel = require('./movimiento.model.js')
const userModel = require('./user.model.js')

// Conexión a la base de datos
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


// Inicializar modelos
const Producto = productoModel(sequelize);
const Categoria = categoriaModel(sequelize);
const Movimiento = movimientoModel(sequelize);
const User = userModel(sequelize)

// Relaciones entre tablas
User.hasMany(Producto, { foreignKey: 'idUsuario' });
Producto.belongsTo(User, { foreignKey: 'idUsuario' });

//User.hasMany(Proveedor, { foreignKey: 'idUsuario' });
//Proveedor.belongsTo(User, { foreignKey: 'idUsuario' });

User.hasMany(Categoria, { foreignKey: 'idUsuario' });
Categoria.belongsTo(User, { foreignKey: 'idUsuario' });

Producto.hasMany(Movimiento, { foreignKey: 'idProducto' });
Movimiento.belongsTo(Producto, { foreignKey: 'idProducto' });


module.exports = {
  sequelize,
  Sequelize,
  Producto,
  Categoria,
  Movimiento,
  User
};

