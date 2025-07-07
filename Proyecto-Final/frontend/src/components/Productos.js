import React, { useState, useEffect } from 'react';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    codigo: '',
    descripcion: '',
    precio: '',
    stock_actual: '',
    stock_minimo: '',
    categoria_id: '',
    activo: true
  });

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
  }, []);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/productos');
      const data = await response.json();
      setProductos(data);
    } catch (err) {
      setError('Error al cargar productos');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/categorias');
      const data = await response.json();
      setCategorias(data);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProduct
        ? `http://localhost:3001/api/productos/${editingProduct.id}`
        : 'http://localhost:3001/api/productos';

      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchProductos();
        setShowModal(false);
        setEditingProduct(null);
        setFormData({
          nombre: '',
          codigo: '',
          descripcion: '',
          precio: '',
          stock_actual: '',
          stock_minimo: '',
          categoria_id: '',
          activo: true
        });
      } else {
        throw new Error('Error al guardar producto');
      }
    } catch (err) {
      setError('Error al guardar producto');
      console.error('Error:', err);
    }
  };

  const handleEdit = (producto) => {
    setEditingProduct(producto);
    setFormData({
      nombre: producto.nombre,
      codigo: producto.codigo,
      descripcion: producto.descripcion || '',
      precio: producto.precio,
      stock_actual: producto.stock_actual,
      stock_minimo: producto.stock_minimo,
      categoria_id: producto.categoria_id,
      activo: producto.activo
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/productos/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchProductos();
        } else {
          throw new Error('Error al eliminar producto');
        }
      } catch (err) {
        setError('Error al eliminar producto');
        console.error('Error:', err);
      }
    }
  };

  const openModal = () => {
    setEditingProduct(null);
    setFormData({
      nombre: '',
      codigo: '',
      descripcion: '',
      precio: '',
      stock_actual: '',
      stock_minimo: '',
      categoria_id: '',
      activo: true
    });
    setShowModal(true);
  };

  const getCategoriaName = (categoriaId) => {
    const categoria = categorias.find(c => c.id === categoriaId);
    return categoria ? categoria.nombre : 'Sin categoría';
  };

  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Gestión de Productos</h2>
          <button className="btn btn-success" onClick={openModal}>
            + Agregar Producto
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock Actual</th>
              <th>Stock Mínimo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(producto => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>{getCategoriaName(producto.categoria_id)}</td>
                <td>${producto.precio}</td>
                <td>
                  <span className={producto.stock_actual <= producto.stock_minimo ? 'badge badge-danger' : 'badge badge-success'}>
                    {producto.stock_actual}
                  </span>
                </td>
                <td>{producto.stock_minimo}</td>
                <td>
                  <span className={`badge ${producto.activo ? 'badge-success' : 'badge-danger'}`}>
                    {producto.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleEdit(producto)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(producto.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {productos.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            No hay productos registrados
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</h3>
              <button className="close" onClick={() => setShowModal(false)}>×</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Código:</label>
                <input
                  type="text"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Descripción:</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Precio:</label>
                <input
                  type="number"
                  step="0.01"
                  name="precio"
                  value={formData.precio}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Stock Actual:</label>
                <input
                  type="number"
                  name="stock_actual"
                  value={formData.stock_actual}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Stock Mínimo:</label>
                <input
                  type="number"
                  name="stock_minimo"
                  value={formData.stock_minimo}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Categoría:</label>
                <select
                  name="categoria_id"
                  value={formData.categoria_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  {categorias.map(categoria => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="activo"
                    checked={formData.activo}
                    onChange={handleInputChange}
                  />
                  Producto activo
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-success">
                  {editingProduct ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;
