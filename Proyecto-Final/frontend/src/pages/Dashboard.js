import React from 'react';
import useInventario from '../hooks/useInventario';

export default function Dashboard() {
  const { productos, categorias, movimientos, loading, error } = useInventario();

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  const bajoStock = productos.filter(p => p.stock_actual <= p.stock_minimo).length;

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="stats">
        <div className="stat-card"><h3>Productos</h3><div className="number">{productos.length}</div></div>
        <div className="stat-card"><h3>Categorías</h3><div className="number">{categorias.length}</div></div>
        <div className="stat-card"><h3>Movimientos</h3><div className="number">{movimientos.length}</div></div>
        <div className="stat-card"><h3>Bajo Stock</h3><div className="number" style={{color: bajoStock>0?'#e74c3c':'#27ae60'}}>{bajoStock}</div></div>
      </div>
    </div>
  );
}
