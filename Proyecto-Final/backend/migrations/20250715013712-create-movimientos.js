'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('movimientos', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      tipo: { type: Sequelize.ENUM('entrada', 'salida', 'ajuste'), allowNull: false },
      cantidad: { type: Sequelize.INTEGER, allowNull: false },
      observaciones: Sequelize.STRING,
      fecha: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      idProducto: { type: Sequelize.INTEGER, allowNull: false },
      idUsuario: { type: Sequelize.INTEGER, allowNull: false },
      idProveedor: Sequelize.INTEGER
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('movimientos');
  }
};
