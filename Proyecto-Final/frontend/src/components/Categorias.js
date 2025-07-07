import React, { useState, useEffect } from 'react';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/categorias');
      const data = await response.json();
      setCategorias(data);
    } catch (err) {
      setError('Error al cargar categorías');
      console.error('Error:', err);
    } finally {
      setLoading(false);
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
      const url = editingCategory
        ? `http://localhost:3001/api/categorias/${editingCategory.id}`
        : 'http://localhost:3001/api/categorias';

      const method = editingCategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchCategorias();
        setShowModal(false);
        setEditingCategory(null);
        setFormData({
          nombre: '',
          descripcion: ''
        });
      } else {
        throw new Error('Error al guardar categoría');
      }
    } catch (err) {
      setError('Error al guardar categoría');
      console.error('Error:', err);
    }
  };

  const handleEdit = (categoria) => {
    setEditingCategory(categoria);
    setFormData({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/categorias/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchCategorias();
        } else {
          throw new Error('Error al eliminar categoría');
        }
      } catch (err) {
        setError('Error al eliminar categoría');
        console.error('Error:', err);
      }
    }
  };

  const openModal = () => {
    setEditingCategory(null);
    setFormData({
      nombre: '',
      descripcion: ''
    });
    setShowModal(true);
  };

  if (loading) {
    return <div className="loading">Cargando categorías...</div>;
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Gestión de Categorías</h2>
          <button className="btn btn-success" onClick={openModal}>
            + Agregar Categoría
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map(categoria => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
                <td>{categoria.descripcion || 'Sin descripción'}</td>
                <td>{new Date(categoria.created_at).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleEdit(categoria)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(categoria.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {categorias.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            No hay categorías registradas
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingCategory ? 'Editar Categoría' : 'Agregar Categoría'}</h3>
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
                <label>Descripción:</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-success">
                  {editingCategory ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorias;
