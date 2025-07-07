import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { categoriaService } from '../services/api';

const Categorias = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState(null);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // Query para obtener categorías
  const { data: categorias, isLoading, error } = useQuery('categorias',
    () => categoriaService.getAll().then(res => res.data.data)
  );

  // Mutación para crear categoría
  const createMutation = useMutation(categoriaService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('categorias');
      toast.success('Categoría creada exitosamente');
      reset();
      setShowForm(false);
    },
    onError: () => {
      toast.error('Error al crear la categoría');
    }
  });

  // Mutación para actualizar categoría
  const updateMutation = useMutation(
    ({ id, data }) => categoriaService.update(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categorias');
        toast.success('Categoría actualizada exitosamente');
        reset();
        setShowForm(false);
        setEditingCategoria(null);
      },
      onError: () => {
        toast.error('Error al actualizar la categoría');
      }
    }
  );

  // Mutación para eliminar categoría
  const deleteMutation = useMutation(categoriaService.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('categorias');
      toast.success('Categoría eliminada exitosamente');
    },
    onError: () => {
      toast.error('Error al eliminar la categoría');
    }
  });

  const onSubmit = (data) => {
    if (editingCategoria) {
      updateMutation.mutate({ id: editingCategoria.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (categoria) => {
    setEditingCategoria(categoria);
    setValue('nombre', categoria.nombre);
    setValue('descripcion', categoria.descripcion);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleNewCategoria = () => {
    setEditingCategoria(null);
    reset();
    setShowForm(true);
  };

  if (isLoading) return <div className="loading">Cargando categorías...</div>;
  if (error) return <div className="error">Error al cargar categorías</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gestión de Categorías</h1>
        <button className="btn btn-primary" onClick={handleNewCategoria}>
          Nueva Categoría
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <div className="form-header">
            <h2>{editingCategoria ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setShowForm(false);
                setEditingCategoria(null);
                reset();
              }}
            >
              Cancelar
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="form">
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
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                rows="3"
                {...register('descripcion')}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={createMutation.isLoading || updateMutation.isLoading}
            >
              {createMutation.isLoading || updateMutation.isLoading
                ? 'Guardando...'
                : editingCategoria ? 'Actualizar' : 'Crear'
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
              <th>Descripción</th>
              <th>Fecha Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias?.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
                <td>{categoria.descripcion || 'Sin descripción'}</td>
                <td>{new Date(categoria.created_at).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => handleEdit(categoria)}
                      className="btn btn-sm btn-secondary"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(categoria.id)}
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

        {categorias?.length === 0 && (
          <div className="empty-state">
            <p>No hay categorías registradas</p>
            <button className="btn btn-primary" onClick={handleNewCategoria}>
              Crear Primera Categoría
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categorias;
