import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Asegúrate de que esta ruta sea correcta
import '../styles/signUp.css'; // Importación del archivo CSS

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext); // Asumiendo que 'login' es parte del contexto
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3001/api/login/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password,
                    role: 'user',
                    permissions: ['read']
                }),
            });

            if (!res.ok) throw new Error('Error al registrarse');

            // Mantengo alert() como se solicitó, aunque se recomienda usar un modal o notificación en React.
            alert('Usuario creado exitosamente');
            navigate('/login');
        } catch (error) {
            // Mantengo alert() como se solicitó.
            alert('Error al crear usuario.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h1 className="register-title">
                    Crear Cuenta
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            Usuario *
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="form-input"
                            placeholder="Elige un usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Contraseña *
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            placeholder="Elige una contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`submit-button ${loading ? 'submit-button-loading' : ''}`}
                    >
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                <div className="login-link-container">
                    ¿Ya tienes cuenta? <a href="/login" className="login-link">Inicia sesión</a>
                </div>

                <div className="info-text">
                    La contraseña debe contener al menos 8 caracteres.<br />
                    No compartas tus credenciales con terceros.
                </div>
            </div>
        </div>
    );
}
