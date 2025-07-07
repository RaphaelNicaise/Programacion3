import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="nav-title">Sistema de Inventario</h1>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${isActive('/')}`}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/categorias" className={`nav-link ${isActive('/categorias')}`}>
                Categorías
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/productos" className={`nav-link ${isActive('/productos')}`}>
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/movimientos" className={`nav-link ${isActive('/movimientos')}`}>
                Movimientos
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
