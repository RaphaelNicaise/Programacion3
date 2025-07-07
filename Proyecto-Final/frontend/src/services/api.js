import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

console.log('🔗 API Base URL:', API_BASE_URL); // Debug log

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para manejo de errores con mejor logging
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      baseURL: error.config?.baseURL
    });
    return Promise.reject(error);
  }
);

// Servicios de Categorías
export const categoriaService = {
  getAll: () => api.get('/categorias'),
  getById: (id) => api.get(`/categorias/${id}`),
  create: (data) => api.post('/categorias', data),
  update: (id, data) => api.put(`/categorias/${id}`, data),
  delete: (id) => api.delete(`/categorias/${id}`),
};

// Servicios de Productos
export const productoService = {
  getAll: () => api.get('/productos'),
  getById: (id) => api.get(`/productos/${id}`),
  search: (query) => api.get(`/productos/buscar?q=${query}`),
  create: (data) => api.post('/productos', data),
  update: (id, data) => api.put(`/productos/${id}`, data),
  delete: (id) => api.delete(`/productos/${id}`),
};

// Servicios de Movimientos de Inventario
export const movimientoService = {
  getAll: () => api.get('/movimientos'),
  getById: (id) => api.get(`/movimientos/${id}`),
  getByProducto: (productoId) => api.get(`/movimientos/producto/${productoId}`),
  create: (data) => api.post('/movimientos', data),
};

// Servicio de Health Check
export const healthService = {
  check: () => api.get('/health'),
  test: () => api.get('/test'),
};

export default api;
