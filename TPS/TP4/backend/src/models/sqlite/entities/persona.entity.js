const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');


const personasDataBase = sequelize.define('Personas', { 
  id: {type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true},
  nombre: {type: DataTypes.STRING,allowNull: false},
  apellido: {type: DataTypes.STRING,allowNull: false},
  edad: {type: DataTypes.INTEGER,allowNull: false},
  email: {type: DataTypes.STRING,allowNull: false}},

  {timestamps: false,});

module.exports = {personasDataBase};
