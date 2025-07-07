import { fetchApi } from './api';

export const getProductos = () => fetchApi('/productos');
export const addProducto = (data) => fetchApi('/productos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
export const updateProducto = (id, data) => fetchApi(`/productos/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
export const deleteProducto = (id) => fetchApi(`/productos/${id}`, { method: 'DELETE' });
