import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Productos from './pages/productos';
import Categorias from './pages/categorias';
import Movimientos from './pages/movimientos';
import { AuthProvider } from './context/AuthContext';
import SingUp from './pages/signUp.jsx';
import { FloatingThemeToggle } from './components/FloatingThemeToggle';
//import './styles/theme-override.css'; // Importar DESPUÉS de variable.css

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/categorias" element={<Categorias />} />
                    <Route path="/movimientos" element={<Movimientos />} />
                    <Route path="/login/create" element={<SingUp />} />
                </Routes>
                <FloatingThemeToggle />
            </Router>
        </AuthProvider>
    );
}

export default App;