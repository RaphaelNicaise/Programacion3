import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProductos: 0,
    totalCategorias: 0,
    totalMovimientos: 0,
    productosBajoStock: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // Obtener estadísticas del API
        const [productosRes, categoriasRes, movimientosRes] = await Promise.all([
          fetch('http://localhost:3001/api/productos'),
          fetch('http://localhost:3001/api/categorias'),
          fetch('http://localhost:3001/api/movimientos-inventario')
        ]);

        const productos = await productosRes.json();
        const categorias = await categoriasRes.json();
        const movimientos = await movimientosRes.json();

        // Calcular productos bajo stock
        const productosBajoStock = productos.filter(producto =>
          producto.stock_actual <= producto.stock_minimo
        ).length;

        setStats({
          totalProductos: productos.length,
          totalCategorias: categorias.length,
          totalMovimientos: movimientos.length,
          productosBajoStock
        });
      } catch (err) {
        setError('Error al cargar las estadísticas');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="loading">Cargando dashboard...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h2>Dashboard del Sistema</h2>

      <div className="stats">
        <div className="stat-card">
          <h3>Total Productos</h3>
          <div className="number">{stats.totalProductos}</div>
        </div>

        <div className="stat-card">
          <h3>Total Categorías</h3>
          <div className="number">{stats.totalCategorias}</div>
        </div>

        <div className="stat-card">
          <h3>Total Movimientos</h3>
          <div className="number">{stats.totalMovimientos}</div>
        </div>

        <div className="stat-card">
          <h3>Productos Bajo Stock</h3>
          <div className="number" style={{color: stats.productosBajoStock > 0 ? '#e74c3c' : '#27ae60'}}>
            {stats.productosBajoStock}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Resumen del Sistema</h3>
        <p>
          Bienvenido al sistema de inventario. Aquí puedes gestionar productos, categorías y movimientos de inventario.
        </p>
        <ul>
          <li><strong>Productos:</strong> Gestiona el catálogo de productos</li>
          <li><strong>Categorías:</strong> Organiza los productos por categorías</li>
          <li><strong>Movimientos:</strong> Registra entradas, salidas y ajustes de inventario</li>
        </ul>

        {stats.productosBajoStock > 0 && (
          <div className="error">
            <strong>⚠️ Atención:</strong> Hay {stats.productosBajoStock} producto(s) con stock bajo el mínimo requerido.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
