import { fetchApi } from './api';

export const getCategorias = () => fetchApi('/categorias');
export const addCategoria = (data) => fetchApi('/categorias', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
export const deleteCategoria = (id) => fetchApi(`/categorias/${id}`, { method: 'DELETE' });
