const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const Turno = sequelize.define('Turno', {
  id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
  fecha: {type: DataTypes.DATEONLY,allowNull: false},
  hora: {type: DataTypes.STRING,allowNull: false},
  motivo: {type: DataTypes.STRING,allowNull: true},
  pacienteId: { type: DataTypes.INTEGER,allowNull: false}},

  {timestamps: false});

module.exports = { Turno };