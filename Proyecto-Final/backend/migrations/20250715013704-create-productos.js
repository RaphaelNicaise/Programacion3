'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('productos', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: Sequelize.STRING, allowNull: false },
      precioCompra: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      precioVenta: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      stock: { type: Sequelize.INTEGER, defaultValue: 0 },
      idCategoria: Sequelize.INTEGER,
      activo: { type: Sequelize.BOOLEAN, defaultValue: true },
      idUsuario: { type: Sequelize.INTEGER, allowNull: false }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('productos');
  }
};
