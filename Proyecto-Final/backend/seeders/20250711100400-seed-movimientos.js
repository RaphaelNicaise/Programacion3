'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('movimientos', [
      {
        tipo: 'entrada',
        cantidad: 10,
        observaciones: 'Compra inicial de teclados',
        fecha: new Date(),
        idProducto: 1,
        idUsuario: 1,
        idProveedor: null
      },
      {
        tipo: 'entrada',
        cantidad: 50,
        observaciones: 'Compra inicial de papas fritas',
        fecha: new Date(),
        idProducto: 2,
        idUsuario: 1,
        idProveedor: null
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('movimientos', null, {});
  }
};
