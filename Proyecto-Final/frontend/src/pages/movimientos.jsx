import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/movimientos.css'; // Importación del archivo CSS

export default function Movimientos() {
    const [movimientos, setMovimientos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        tipo: 'entrada',
        cantidad: '',
        observaciones: '',
        fecha: new Date().toISOString().slice(0, 16), // formato datetime-local
        idProducto: '',
        idProveedor: ''
    });
    const [formLoading, setFormLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchMovimientos = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const token = localStorage.getItem('token');
                
                if (!token) {
                    navigate('/login');
                    return;
                }
                
                const res = await fetch('http://localhost:3001/api/movimientos', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('token');
                    navigate('/login');
                    return;
                }
                
                if (!res.ok) {
                    throw new Error('Error al obtener movimientos');
                }
                
                const data = await res.json();
                setMovimientos(data);
            } catch (error) {
                console.error('Error fetching movimientos:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovimientos();
    }, [user, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                navigate('/login');
                return;
            }

            // Validaciones básicas
            if (!formData.tipo || !formData.cantidad || !formData.idProducto) {
                alert('Por favor completa todos los campos obligatorios');
                return;
            }

            if (parseInt(formData.cantidad) <= 0) {
                alert('La cantidad debe ser mayor a 0');
                return;
            }

            const movimientoData = {
                tipo: formData.tipo,
                cantidad: parseInt(formData.cantidad),
                observaciones: formData.observaciones.trim() || null,
                fecha: formData.fecha ? new Date(formData.fecha).toISOString() : new Date().toISOString(),
                idProducto: parseInt(formData.idProducto),
                idUsuario: user.id, // Agregar el ID del usuario autenticado
                idProveedor: formData.idProveedor ? parseInt(formData.idProveedor) : null
            };

            const res = await fetch('http://localhost:3001/api/movimientos', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movimientoData)
            });

            if (res.status === 401 || res.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Error al crear el movimiento');
            }

            const movimientoResponse = await res.json();
            
            // Agregar el nuevo movimiento a la lista
            setMovimientos(prev => [...prev, movimientoResponse]);
            alert('Movimiento creado exitosamente');
            
            // Limpiar el formulario y resetear estado
            resetForm();
            
        } catch (error) {
            console.error('Error with movimiento:', error);
            alert(`Error al crear el movimiento: ${error.message}`);
        } finally {
            setFormLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            tipo: 'entrada',
            cantidad: '',
            observaciones: '',
            fecha: new Date().toISOString().slice(0, 16),
            idProducto: '',
            idProveedor: ''
        });
        setShowForm(false);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Sin fecha';
        return new Date(dateString).toLocaleString('es-ES');
    };

    const getTipoColor = (tipo) => {
        switch(tipo) {
            case 'entrada': return 'movimientos-tipo-entrada';
            case 'salida': return 'movimientos-tipo-salida';
            case 'ajuste': return 'movimientos-tipo-ajuste';
            default: return 'movimientos-tipo-default';
        }
    };

    if (loading) {
        return (
            <div id="movimientos-container">
                <h1 className="movimientos-title">Lista de Movimientos</h1>
                <p className="movimientos-loading-message">Cargando movimientos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div id="movimientos-container">
                <h1 className="movimientos-title">Lista de Movimientos</h1>
                <p className="movimientos-error-message">Error: {error}</p>
                <button className="movimientos-button-home" onClick={() => navigate('/')}>Volver al Home</button>
            </div>
        );
    }

    return (
        <div id="movimientos-container">
            <h1 className="movimientos-title">Lista de Movimientos</h1>
            
            <div className="movimientos-button-container">
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className={showForm ? 'movimientos-button-cancel' : 'movimientos-button-add'}
                >
                    {showForm ? 'Cancelar' : 'Agregar Nuevo Movimiento'}
                </button>
            </div>

            {showForm && (
                <div className="movimientos-form-card">
                    <h2 className="movimientos-form-title">Crear Nuevo Movimiento</h2>
                    <form onSubmit={handleSubmit} className="movimientos-form">
                        <div className="movimientos-form-grid">
                            <div className="movimientos-form-group">
                                <label htmlFor="tipo" className="movimientos-label">Tipo *</label>
                                <select
                                    id="tipo"
                                    name="tipo"
                                    value={formData.tipo}
                                    onChange={handleInputChange}
                                    required
                                    className="movimientos-input"
                                >
                                    <option value="entrada">Entrada</option>
                                    <option value="salida">Salida</option>
                                    <option value="ajuste">Ajuste</option>
                                </select>
                            </div>

                            <div className="movimientos-form-group">
                                <label htmlFor="cantidad" className="movimientos-label">Cantidad *</label>
                                <input
                                    type="number"
                                    id="cantidad"
                                    name="cantidad"
                                    value={formData.cantidad}
                                    onChange={handleInputChange}
                                    min="1"
                                    required
                                    className="movimientos-input"
                                />
                            </div>

                            <div className="movimientos-form-group">
                                <label htmlFor="idProducto" className="movimientos-label">ID Producto *</label>
                                <input
                                    type="number"
                                    id="idProducto"
                                    name="idProducto"
                                    value={formData.idProducto}
                                    onChange={handleInputChange}
                                    min="1"
                                    required
                                    className="movimientos-input"
                                />
                            </div>

                            <div className="movimientos-form-group">
                                <label htmlFor="idProveedor" className="movimientos-label">ID Proveedor</label>
                                <input
                                    type="number"
                                    id="idProveedor"
                                    name="idProveedor"
                                    value={formData.idProveedor}
                                    onChange={handleInputChange}
                                    min="1"
                                    className="movimientos-input"
                                />
                            </div>

                            <div className="movimientos-form-group">
                                <label htmlFor="fecha" className="movimientos-label">Fecha y Hora</label>
                                <input
                                    type="datetime-local"
                                    id="fecha"
                                    name="fecha"
                                    value={formData.fecha}
                                    onChange={handleInputChange}
                                    className="movimientos-input"
                                />
                            </div>

                            <div className="movimientos-form-group">
                                <label htmlFor="observaciones" className="movimientos-label">Observaciones</label>
                                <textarea
                                    id="observaciones"
                                    name="observaciones"
                                    value={formData.observaciones}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="movimientos-textarea"
                                />
                            </div>
                        </div>

                        <div className="movimientos-form-actions">
                            <button 
                                type="submit" 
                                disabled={formLoading}
                                className={formLoading ? 'movimientos-button-submit-disabled' : 'movimientos-button-submit'}
                            >
                                {formLoading ? 'Creando...' : 'Crear Movimiento'}
                            </button>
                            <button 
                                type="button" 
                                onClick={resetForm}
                                className="movimientos-button-secondary"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {movimientos.length === 0 ? (
                <p className="movimientos-no-data-message">No hay movimientos disponibles.</p>
            ) : (
                <table className="movimientos-table">
                    <thead>
                        <tr className="movimientos-table-header-row">
                            <th className="movimientos-table-header">ID</th>
                            <th className="movimientos-table-header">Tipo</th>
                            <th className="movimientos-table-header">Cantidad</th>
                            <th className="movimientos-table-header">ID Producto</th>
                            <th className="movimientos-table-header">ID Proveedor</th>
                            <th className="movimientos-table-header">Fecha</th>
                            <th className="movimientos-table-header">Observaciones</th>
                            <th className="movimientos-table-header">ID Usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movimientos.map((movimiento) => (
                            <tr key={movimiento.id} className="movimientos-table-row">
                                <td className="movimientos-table-data">{movimiento.id}</td>
                                <td className="movimientos-table-data">
                                    <span className={getTipoColor(movimiento.tipo)}>
                                        {movimiento.tipo}
                                    </span>
                                </td>
                                <td className="movimientos-table-data">{movimiento.cantidad}</td>
                                <td className="movimientos-table-data">{movimiento.idProducto}</td>
                                <td className="movimientos-table-data">{movimiento.idProveedor || 'N/A'}</td>
                                <td className="movimientos-table-data">{formatDate(movimiento.fecha)}</td>
                                <td className="movimientos-table-data movements-observations-cell">
                                    {movimiento.observaciones || 'Sin observaciones'}
                                </td>
                                <td className="movimientos-table-data">{movimiento.idUsuario}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
            <div className="movimientos-footer-button-container">
                <button 
                    onClick={() => navigate('/')}
                    className="movimientos-button-home"
                >
                    Volver al Home
                </button>
            </div>
        </div>
    );
}