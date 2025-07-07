'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categorias', [
      {
        nombre: 'Electrónicos',
        descripcion: 'Productos electrónicos y tecnológicos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Ropa',
        descripcion: 'Prendas de vestir y accesorios',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Hogar',
        descripcion: 'Artículos para el hogar y decoración',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Deportes',
        descripcion: 'Artículos deportivos y fitness',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Libros',
        descripcion: 'Libros y material educativo',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categorias', null, {});
  }
};
