'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categorias', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: Sequelize.STRING, allowNull: false },
      descripcion: Sequelize.STRING,
      idUsuario: Sequelize.INTEGER
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('categorias');
  }
};
