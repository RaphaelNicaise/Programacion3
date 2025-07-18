import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

export default function Home() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div className="home-container">
            <h1>Bienvenido, {user.username}!</h1>
            <button onClick={() => navigate('/productos')}>Productos</button>
            <button onClick={() => navigate('/categorias')}>Categorías</button>
            <button onClick={() => navigate('/movimientos')}>Movimientos</button>
            <br />
            <button className="logout-button" onClick={() => { logout(); navigate('/login'); }}>
                Logout
            </button>
        </div>
    );
}