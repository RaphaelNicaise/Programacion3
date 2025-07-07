'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('movimientos_inventario', [
      {
        producto_id: 1, // Smartphone Samsung
        tipo_movimiento: 'entrada',
        cantidad: 20,
        stock_anterior: 0,
        stock_nuevo: 20,
        fecha_movimiento: new Date('2024-01-15'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        producto_id: 1, // Smartphone Samsung
        tipo_movimiento: 'salida',
        cantidad: 5,
        stock_anterior: 20,
        stock_nuevo: 15,
        fecha_movimiento: new Date('2024-01-20'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        producto_id: 2, // Laptop Lenovo
        tipo_movimiento: 'entrada',
        cantidad: 10,
        stock_anterior: 0,
        stock_nuevo: 10,
        fecha_movimiento: new Date('2024-01-16'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        producto_id: 2, // Laptop Lenovo
        tipo_movimiento: 'salida',
        cantidad: 2,
        stock_anterior: 10,
        stock_nuevo: 8,
        fecha_movimiento: new Date('2024-01-22'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        producto_id: 4, // Camiseta Nike
        tipo_movimiento: 'entrada',
        cantidad: 50,
        stock_anterior: 0,
        stock_nuevo: 50,
        fecha_movimiento: new Date('2024-01-18'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        producto_id: 4, // Camiseta Nike
        tipo_movimiento: 'salida',
        cantidad: 20,
        stock_anterior: 50,
        stock_nuevo: 30,
        fecha_movimiento: new Date('2024-01-25'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        producto_id: 6, // Aspiradora Philips
        tipo_movimiento: 'entrada',
        cantidad: 8,
        stock_anterior: 0,
        stock_nuevo: 8,
        fecha_movimiento: new Date('2024-01-19'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        producto_id: 6, // Aspiradora Philips
        tipo_movimiento: 'salida',
        cantidad: 2,
        stock_anterior: 8,
        stock_nuevo: 6,
        fecha_movimiento: new Date('2024-01-26'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('movimientos_inventario', null, {});
  }
};
