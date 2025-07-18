const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const Paciente = sequelize.define('Paciente', {
  id: {type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true},
  dni: {type: DataTypes.STRING,allowNull: false,unique: true},
  nombre: {type: DataTypes.STRING,allowNull: false},
  apellido: {type: DataTypes.STRING,allowNull: false},
  email: {type: DataTypes.STRING,allowNull: false}},

  {timestamps: false,});

module.exports = { Paciente };