'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('productos', [
      {
        nombre: 'Smartphone Samsung Galaxy A54',
        codigo: 'SAMSG001',
        descripcion: 'Smartphone con pantalla de 6.4 pulgadas, 128GB almacenamiento',
        precio: 299.99,
        stock_actual: 15,
        stock_minimo: 5,
        categoria_id: 1, // Electrónicos
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Laptop Lenovo ThinkPad',
        codigo: 'LENO001',
        descripcion: 'Laptop empresarial Intel i5, 8GB RAM, 256GB SSD',
        precio: 899.99,
        stock_actual: 8,
        stock_minimo: 3,
        categoria_id: 1, // Electrónicos
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Auriculares Sony WH-1000XM4',
        codigo: 'SONY001',
        descripcion: 'Auriculares inalámbricos con cancelación de ruido',
        precio: 199.99,
        stock_actual: 12,
        stock_minimo: 4,
        categoria_id: 1, // Electrónicos
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Camiseta Nike Dri-FIT',
        codigo: 'NIKE001',
        descripcion: 'Camiseta deportiva manga corta, talla M',
        precio: 25.99,
        stock_actual: 30,
        stock_minimo: 10,
        categoria_id: 2, // Ropa
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Jeans Levis 501',
        codigo: 'LEVI001',
        descripcion: 'Jeans clásicos de corte recto, talla 32',
        precio: 79.99,
        stock_actual: 18,
        stock_minimo: 6,
        categoria_id: 2, // Ropa
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Aspiradora Philips 2000W',
        codigo: 'PHIL001',
        descripcion: 'Aspiradora sin bolsa con filtro HEPA',
        precio: 159.99,
        stock_actual: 6,
        stock_minimo: 2,
        categoria_id: 3, // Hogar
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Cafetera Nespresso',
        codigo: 'NESP001',
        descripcion: 'Cafetera de cápsulas automática',
        precio: 129.99,
        stock_actual: 10,
        stock_minimo: 3,
        categoria_id: 3, // Hogar
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Pelota de Fútbol Adidas',
        codigo: 'ADID001',
        descripcion: 'Pelota de fútbol oficial FIFA tamaño 5',
        precio: 39.99,
        stock_actual: 25,
        stock_minimo: 8,
        categoria_id: 4, // Deportes
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Pesas Adjustables 20kg',
        codigo: 'PESO001',
        descripcion: 'Set de pesas ajustables hasta 20kg cada una',
        precio: 149.99,
        stock_actual: 5,
        stock_minimo: 2,
        categoria_id: 4, // Deportes
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Libro "Clean Code"',
        codigo: 'BOOK001',
        descripcion: 'Libro de programación por Robert C. Martin',
        precio: 45.99,
        stock_actual: 20,
        stock_minimo: 5,
        categoria_id: 5, // Libros
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('productos', null, {});
  }
};
