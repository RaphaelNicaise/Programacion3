const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
