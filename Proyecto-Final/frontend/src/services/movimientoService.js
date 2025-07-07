import { fetchApi } from './api';

export const getMovimientos = () => fetchApi('/movimientos-inventario');
export const addMovimiento = (data) => fetchApi('/movimientos-inventario', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
