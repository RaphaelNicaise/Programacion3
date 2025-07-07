import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { movimientoService, productoService } from '../services/api';

const MovimientosInventario = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState('');
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Query para obtener movimientos
  const { data: movimientos, isLoading, error } = useQuery('movimientos',
    () => movimientoService.getAll().then(res => res.data.data)
  );

  // Query para obtener productos
  const { data: productos } = useQuery('productos',
    () => productoService.getAll().then(res => res.data.data)
  );

  // Query para obtener movimientos por producto
  const { data: movimientosByProducto } = useQuery(
    ['movimientos-producto', selectedProducto],
    () => selectedProducto ? movimientoService.getByProducto(selectedProducto).then(res => res.data.data) : null,
    { enabled: !!selectedProducto }
  );

  // Mutación para crear movimiento
  const createMutation = useMutation(movimientoService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('movimientos');
      queryClient.invalidateQueries('productos');
      queryClient.invalidateQueries(['movimientos-producto', selectedProducto]);
      toast.success('Movimiento registrado exitosamente');
      reset();
      setShowForm(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Error al registrar el movimiento');
    }
  });

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      producto_id: parseInt(data.producto_id),
      cantidad: parseInt(data.cantidad)
    };
    createMutation.mutate(formattedData);
  };

  const handleNewMovimiento = () => {
    reset();
    setShowForm(true);
  };

  // Movimientos filtrados
  const displayMovimientos = selectedProducto ? movimientosByProducto : movimientos;

  if (isLoading) return <div className="loading">Cargando movimientos...</div>;
  if (error) return <div className="error">Error al cargar movimientos</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Movimientos de Inventario</h1>
        <button className="btn btn-primary" onClick={handleNewMovimiento}>
          Registrar Movimiento
        </button>
      </div>

      {/* Filtro por producto */}
      <div className="filter-container">
        <div className="form-group">
          <label htmlFor="producto-filter">Filtrar por producto:</label>
          <select
            id="producto-filter"
            value={selectedProducto}
            onChange={(e) => setSelectedProducto(e.target.value)}
            className="select-input"
          >
            <option value="">Todos los productos</option>
            {productos?.map(producto => (
              <option key={producto.id} value={producto.id}>
                {producto.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {showForm && (
        <div className="form-container">
          <div className="form-header">
            <h2>Registrar Nuevo Movimiento</h2>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setShowForm(false);
                reset();
              }}
            >
              Cancelar
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="producto_id">Producto *</label>
                <select
                  id="producto_id"
                  {...register('producto_id', { required: 'El producto es requerido' })}
                  className={errors.producto_id ? 'error' : ''}
                >
                  <option value="">Seleccionar producto</option>
                  {productos?.map(producto => (
                    <option key={producto.id} value={producto.id}>
                      {producto.nombre} (Stock: {producto.stock})
                    </option>
                  ))}
                </select>
                {errors.producto_id && <span className="error-text">{errors.producto_id.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="tipo_movimiento">Tipo de Movimiento *</label>
                <select
                  id="tipo_movimiento"
                  {...register('tipo_movimiento', { required: 'El tipo de movimiento es requerido' })}
                  className={errors.tipo_movimiento ? 'error' : ''}
                >
                  <option value="">Seleccionar tipo</option>
                  <option value="entrada">Entrada</option>
                  <option value="salida">Salida</option>
                </select>
                {errors.tipo_movimiento && <span className="error-text">{errors.tipo_movimiento.message}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cantidad">Cantidad *</label>
                <input
                  id="cantidad"
                  type="number"
                  min="1"
                  {...register('cantidad', {
                    required: 'La cantidad es requerida',
                    min: { value: 1, message: 'La cantidad debe ser mayor a 0' }
                  })}
                  className={errors.cantidad ? 'error' : ''}
                />
                {errors.cantidad && <span className="error-text">{errors.cantidad.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="motivo">Motivo</label>
                <input
                  id="motivo"
                  type="text"
                  placeholder="Ej: Compra, Venta, Ajuste..."
                  {...register('motivo')}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="observaciones">Observaciones</label>
              <textarea
                id="observaciones"
                rows="3"
                placeholder="Información adicional sobre el movimiento..."
                {...register('observaciones')}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={createMutation.isLoading}
            >
              {createMutation.isLoading ? 'Registrando...' : 'Registrar Movimiento'}
            </button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Motivo</th>
              <th>Fecha</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {displayMovimientos?.map((movimiento) => (
              <tr key={movimiento.id}>
                <td>{movimiento.id}</td>
                <td>{movimiento.Producto?.nombre || 'Producto no encontrado'}</td>
                <td>
                  <span className={`badge ${movimiento.tipo_movimiento === 'entrada' ? 'badge-success' : 'badge-danger'}`}>
                    {movimiento.tipo_movimiento === 'entrada' ? 'Entrada' : 'Salida'}
                  </span>
                </td>
                <td>{movimiento.cantidad}</td>
                <td>{movimiento.motivo || 'Sin motivo'}</td>
                <td>{new Date(movimiento.createdAt).toLocaleString()}</td>
                <td>{movimiento.observaciones || 'Sin observaciones'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {displayMovimientos?.length === 0 && (
          <div className="empty-state">
            <p>
              {selectedProducto
                ? 'No hay movimientos para este producto'
                : 'No hay movimientos registrados'
              }
            </p>
            <button className="btn btn-primary" onClick={handleNewMovimiento}>
              Registrar Primer Movimiento
            </button>
          </div>
        )}
      </div>

      {/* Resumen de stock por producto */}
      {productos && (
        <div className="summary-container">
          <h2>Resumen de Stock</h2>
          <div className="stock-grid">
            {productos.map(producto => (
              <div key={producto.id} className="stock-card">
                <h3>{producto.nombre}</h3>
                <div className="stock-info">
                  <span className="stock-current">Stock Actual: {producto.stock}</span>
                  <span className="stock-category">Categoría: {producto.Categoria?.nombre}</span>
                  <span className="stock-price">Precio: ${Number(producto.precio).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovimientosInventario;
