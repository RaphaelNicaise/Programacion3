'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      role: { type: Sequelize.STRING, allowNull: false, defaultValue: 'user' },
      permissions: { type: Sequelize.JSON, allowNull: false, defaultValue: ['read'] },
      activo: { type: Sequelize.BOOLEAN, defaultValue: true }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('usuarios');
  }
};
