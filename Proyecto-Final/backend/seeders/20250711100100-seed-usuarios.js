'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('usuarios', [
      { username: 'admin1', password: '12345678', role: 'admin', permissions: JSON.stringify(['read', 'write']), activo: true },
      { username: 'user1', password: '12345678', role: 'user', permissions: JSON.stringify(['read']), activo: true }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
