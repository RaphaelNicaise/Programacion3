import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; // Importación del archivo CSS
import '../styles/theme-override.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            
            if (!res.ok) throw new Error('Login failed');
            
            const data = await res.json();
            
            // Guardar el token en localStorage
            localStorage.setItem('token', data.token);
            
            // Guardar datos del usuario
            login({ id: data.user.id, username: data.user.username });
            
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = "Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.";
            const messageBox = document.createElement('div');
            messageBox.className = 'login-error-message-box'; // Usar clase para el estilo
            messageBox.textContent = errorMessage;
            document.body.appendChild(messageBox);
            setTimeout(() => {
                if (document.body.contains(messageBox)) { // Verificar si el elemento aún existe antes de intentar removerlo
                    document.body.removeChild(messageBox);
                }
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="login-page-container">
            <div className="login-form-card">
                <h1 className="login-title">
                    Iniciar Sesión
                </h1>
                <p className="login-clarification-text">
                    Al ejecutar los seeders podés ingresar con el usuario "admin1" y contraseña "12345678". También podés crear tu propio usuario.
                </p>
                
                <form onSubmit={handleSubmit}>
                    <div className="login-form-group">
                        <label htmlFor="login-username-input" className="login-label">
                            Usuario *
                        </label>
                        <input
                            type="text"
                            id="login-username-input" // ID específico
                            className="login-input" // Clase específica
                            placeholder="Ingresa tu usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="login-form-group">
                        <label htmlFor="login-password-input" className="login-label">
                            Contraseña *
                        </label>
                        <input
                            type="password"
                            id="login-password-input" // ID específico
                            className="login-input" // Clase específica
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`login-submit-button ${loading ? 'login-submit-button-loading' : ''}`} // Clases para el botón
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <div className="login-register-link-container">
                    ¿No tienes una cuenta? <a href="/login/create" className="login-register-link">Regístrate</a>
                </div>
            </div>
        </div>
    );
}
