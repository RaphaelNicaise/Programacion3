import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { productoService, categoriaService } from '../services/api';

const Productos = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProducto, setEditingProducto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // Query para obtener productos
  const { data: productos, isLoading, error } = useQuery('productos',
    () => productoService.getAll().then(res => res.data.data)
  );

  // Query para obtener categorías
  const { data: categorias } = useQuery('categorias',
    () => categoriaService.getAll().then(res => res.data.data)
  );

  // Mutación para crear producto
  const createMutation = useMutation(productoService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('productos');
      toast.success('Producto creado exitosamente');
      reset();
      setShowForm(false);
    },
    onError: () => {
      toast.error('Error al crear el producto');
    }
  });

  // Mutación para actualizar producto
  const updateMutation = useMutation(
    ({ id, data }) => productoService.update(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('productos');
        toast.success('Producto actualizado exitosamente');
        reset();
        setShowForm(false);
        setEditingProducto(null);
      },
      onError: () => {
        toast.error('Error al actualizar el producto');
      }
    }
  );

  // Mutación para eliminar producto
  const deleteMutation = useMutation(productoService.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('productos');
      toast.success('Producto eliminado exitosamente');
    },
    onError: () => {
      toast.error('Error al eliminar el producto');
    }
  });

  const onSubmit = (data) => {
    // Convertir strings a números
    const formattedData = {
      ...data,
      precio: parseFloat(data.precio),
      stock: parseInt(data.stock),
      categoria_id: parseInt(data.categoria_id)
    };

    if (editingProducto) {
      updateMutation.mutate({ id: editingProducto.id, data: formattedData });
    } else {
      createMutation.mutate(formattedData);
    }
  };

  const handleEdit = (producto) => {
    setEditingProducto(producto);
    setValue('nombre', producto.nombre);
    setValue('descripcion', producto.descripcion);
    setValue('precio', producto.precio);
    setValue('stock', producto.stock);
    setValue('categoria_id', producto.categoria_id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleNewProducto = () => {
    setEditingProducto(null);
    reset();
    setShowForm(true);
  };

  // Filtrar productos por búsqueda
  const filteredProductos = productos?.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) return <div className="loading">Cargando productos...</div>;
  if (error) return <div className="error">Error al cargar productos</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gestión de Productos</h1>
        <button className="btn btn-primary" onClick={handleNewProducto}>
          Nuevo Producto
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {showForm && (
        <div className="form-container">
          <div className="form-header">
            <h2>{editingProducto ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setShowForm(false);
                setEditingProducto(null);
                reset();
              }}
            >
              Cancelar
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre *</label>
                <input
                  id="nombre"
                  type="text"
                  {...register('nombre', { required: 'El nombre es requerido' })}
                  className={errors.nombre ? 'error' : ''}
                />
                {errors.nombre && <span className="error-text">{errors.nombre.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="categoria_id">Categoría *</label>
                <select
                  id="categoria_id"
                  {...register('categoria_id', { required: 'La categoría es requerida' })}
                  className={errors.categoria_id ? 'error' : ''}
                >
                  <option value="">Seleccionar categoría</option>
                  {categorias?.map(categoria => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
                {errors.categoria_id && <span className="error-text">{errors.categoria_id.message}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                rows="3"
                {...register('descripcion')}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="precio">Precio *</label>
                <input
                  id="precio"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register('precio', {
                    required: 'El precio es requerido',
                    min: { value: 0, message: 'El precio debe ser mayor a 0' }
                  })}
                  className={errors.precio ? 'error' : ''}
                />
                {errors.precio && <span className="error-text">{errors.precio.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="stock">Stock *</label>
                <input
                  id="stock"
                  type="number"
                  min="0"
                  {...register('stock', {
                    required: 'El stock es requerido',
                    min: { value: 0, message: 'El stock debe ser mayor o igual a 0' }
                  })}
                  className={errors.stock ? 'error' : ''}
                />
                {errors.stock && <span className="error-text">{errors.stock.message}</span>}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={createMutation.isLoading || updateMutation.isLoading}
            >
              {createMutation.isLoading || updateMutation.isLoading
                ? 'Guardando...'
                : editingProducto ? 'Actualizar' : 'Crear'
              }
            </button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.Categoria?.nombre || 'Sin categoría'}</td>
                <td>${Number(producto.precio).toFixed(2)}</td>
                <td>{producto.stock}</td>
                <td>{producto.descripcion || 'Sin descripción'}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => handleEdit(producto)}
                      className="btn btn-sm btn-secondary"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(producto.id)}
                      className="btn btn-sm btn-danger"
                      disabled={deleteMutation.isLoading}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProductos.length === 0 && !searchTerm && (
          <div className="empty-state">
            <p>No hay productos registrados</p>
            <button className="btn btn-primary" onClick={handleNewProducto}>
              Crear Primer Producto
            </button>
          </div>
        )}

        {filteredProductos.length === 0 && searchTerm && (
          <div className="empty-state">
            <p>No se encontraron productos que coincidan con "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Productos;
