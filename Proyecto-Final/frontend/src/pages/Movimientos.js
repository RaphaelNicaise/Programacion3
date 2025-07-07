import React, { useState, useEffect } from 'react';
import { getMovimientos, addMovimiento } from '../services/movimientoService';

export default function Movimientos() {
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovimientos().then(setMovimientos).catch(()=>setError('Error')).finally(()=>setLoading(false));
  }, []);

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h2>Movimientos de Inventario</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th><th>Producto</th><th>Tipo</th><th>Cantidad</th><th>Stock Anterior</th><th>Stock Nuevo</th><th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.producto_id}</td>
              <td>{m.tipo_movimiento}</td>
              <td>{m.cantidad}</td>
              <td>{m.stock_anterior}</td>
              <td>{m.stock_nuevo}</td>
              <td>{m.fecha_movimiento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
