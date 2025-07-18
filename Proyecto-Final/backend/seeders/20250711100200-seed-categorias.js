'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('categorias', [
      { nombre: 'Electrónica', descripcion: 'Productos electrónicos', idUsuario: 1 },
      { nombre: 'Alimentos', descripcion: 'Productos comestibles', idUsuario: 1 }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('categorias', null, {});
  }
};
