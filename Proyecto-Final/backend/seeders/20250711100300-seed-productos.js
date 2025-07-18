'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('productos', [
      {
        nombre: 'Teclado Mecánico',
        precioCompra: 50,
        precioVenta: 75,
        stock: 10,
        idCategoria: 1,
        idUsuario: 1,
        activo: true
      },
      {
        nombre: 'Papas Fritas',
        precioCompra: 2,
        precioVenta: 3,
        stock: 50,
        idCategoria: 2,
        idUsuario: 1,
        activo: true
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('productos', null, {});
  }
};
