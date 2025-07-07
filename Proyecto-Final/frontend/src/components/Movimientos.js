import React, { useState, useEffect } from 'react';

const Movimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    producto_id: '',
    tipo_movimiento: '',
    cantidad: '',
    observaciones: ''
  });

  useEffect(() => {
    fetchMovimientos();
    fetchProductos();
  }, []);

  const fetchMovimientos = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/movimientos-inventario');
      const data = await response.json();
      setMovimientos(data);
    } catch (err) {
      setError('Error al cargar movimientos');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/productos');
      const data = await response.json();
      setProductos(data);
    } catch (err) {
      console.error('Error al cargar productos:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/movimientos-inventario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchMovimientos();
        setShowModal(false);
        setFormData({
          producto_id: '',
          tipo_movimiento: '',
          cantidad: '',
          observaciones: ''
        });
      } else {
        throw new Error('Error al crear movimiento');
      }
    } catch (err) {
      setError('Error al crear movimiento');
      console.error('Error:', err);
    }
  };

  const openModal = () => {
    setFormData({
      producto_id: '',
      tipo_movimiento: '',
      cantidad: '',
      observaciones: ''
    });
    setShowModal(true);
  };

  const getProductoName = (productoId) => {
    const producto = productos.find(p => p.id === productoId);
    return producto ? `${producto.nombre} (${producto.codigo})` : 'Producto no encontrado';
  };

  const getTipoMovimientoLabel = (tipo) => {
    switch(tipo) {
      case 'entrada':
        return 'Entrada';
      case 'salida':
        return 'Salida';
      case 'ajuste':
        return 'Ajuste';
      default:
        return tipo;
    }
  };

  const getTipoMovimientoBadge = (tipo) => {
    switch(tipo) {
      case 'entrada':
        return 'badge-success';
      case 'salida':
        return 'badge-danger';
      case 'ajuste':
        return 'badge-warning';
      default:
        return 'badge-info';
    }
  };

  if (loading) {
    return <div className="loading">Cargando movimientos...</div>;
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Movimientos de Inventario</h2>
          <button className="btn btn-success" onClick={openModal}>
            + Registrar Movimiento
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Stock Anterior</th>
              <th>Stock Nuevo</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map(movimiento => (
              <tr key={movimiento.id}>
                <td>{movimiento.id}</td>
                <td>{getProductoName(movimiento.producto_id)}</td>
                <td>
                  <span className={`badge ${getTipoMovimientoBadge(movimiento.tipo_movimiento)}`}>
                    {getTipoMovimientoLabel(movimiento.tipo_movimiento)}
                  </span>
                </td>
                <td>{movimiento.cantidad}</td>
                <td>{movimiento.stock_anterior}</td>
                <td>{movimiento.stock_nuevo}</td>
                <td>{new Date(movimiento.fecha_movimiento).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {movimientos.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            No hay movimientos registrados
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Registrar Movimiento</h3>
              <button className="close" onClick={() => setShowModal(false)}>×</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Producto:</label>
                <select
                  name="producto_id"
                  value={formData.producto_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar producto</option>
                  {productos.map(producto => (
                    <option key={producto.id} value={producto.id}>
                      {producto.nombre} ({producto.codigo}) - Stock: {producto.stock_actual}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Tipo de Movimiento:</label>
                <select
                  name="tipo_movimiento"
                  value={formData.tipo_movimiento}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar tipo</option>
                  <option value="entrada">Entrada</option>
                  <option value="salida">Salida</option>
                  <option value="ajuste">Ajuste</option>
                </select>
              </div>

              <div className="form-group">
                <label>Cantidad:</label>
                <input
                  type="number"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleInputChange}
                  required
                  min="1"
                />
              </div>

              <div className="form-group">
                <label>Observaciones:</label>
                <textarea
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleInputChange}
                  placeholder="Observaciones adicionales (opcional)"
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-success">
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movimientos;
