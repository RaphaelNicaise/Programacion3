import React, { useState, useEffect } from 'react';
import { healthService } from '../services/api';

const Home = () => {
  const [health, setHealth] = useState(null);
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        setLoading(true);
        const [healthResponse, testResponse] = await Promise.all([
          healthService.check(),
          healthService.test()
        ]);
        setHealth(healthResponse.data);
        setTestData(testResponse.data);
      } catch (err) {
        setError('Error conectando con el backend');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="home-header">
        <h1>Sistema de Gestión de Inventario</h1>
        <p>Bienvenido al sistema de gestión de inventario. Administra categorías, productos y movimientos de stock.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Estado del Backend</h3>
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="success-message">
              ✅ {health?.message || 'Conectado'}
            </div>
          )}
        </div>

        {testData && (
          <div className="stat-card">
            <h3>Información del Sistema</h3>
            <ul>
              <li><strong>Backend:</strong> {testData.data?.backend}</li>
              <li><strong>Base de Datos:</strong> {testData.data?.database}</li>
              <li><strong>ORM:</strong> {testData.data?.orm}</li>
            </ul>
          </div>
        )}

        {health && (
          <div className="stat-card">
            <h3>Detalles de Conexión</h3>
            <ul>
              <li><strong>Estado:</strong> {health.status}</li>
              <li><strong>Ambiente:</strong> {health.environment}</li>
              <li><strong>Timestamp:</strong> {new Date(health.timestamp).toLocaleString()}</li>
            </ul>
          </div>
        )}
      </div>

      <div className="quick-actions">
        <h2>Acciones Rápidas</h2>
        <div className="action-grid">
          <div className="action-card">
            <h3>Gestionar Categorías</h3>
            <p>Crear, editar y eliminar categorías de productos</p>
            <a href="/categorias" className="btn btn-primary">Ir a Categorías</a>
          </div>
          <div className="action-card">
            <h3>Gestionar Productos</h3>
            <p>Administrar el catálogo de productos y su información</p>
            <a href="/productos" className="btn btn-primary">Ir a Productos</a>
          </div>
          <div className="action-card">
            <h3>Ver Movimientos</h3>
            <p>Consultar historial de movimientos de inventario</p>
            <a href="/movimientos" className="btn btn-primary">Ir a Movimientos</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
