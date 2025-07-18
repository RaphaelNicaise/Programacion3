import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/categorias.css'; // La importación de CSS


export default function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: ''
    });
    const [formLoading, setFormLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchCategorias = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const token = localStorage.getItem('token');
                
                if (!token) {
                    navigate('/login');
                    return;
                }
                
                const res = await fetch('http://localhost:3001/api/categorias', {
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
                    throw new Error('Error al obtener categorías');
                }
                
                const data = await res.json();
                setCategorias(data);
            } catch (error) {
                console.error('Error fetching categorias:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategorias();
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
            if (!formData.nombre.trim()) {
                alert('Por favor ingresa un nombre para la categoría');
                return;
            }

            const categoryData = {
                nombre: formData.nombre.trim(),
                descripcion: formData.descripcion.trim() || null,
                idUsuario: user.id // Agregar el ID del usuario autenticado
            };

            const isEditing = editingCategory !== null;
            const url = isEditing 
                ? `http://localhost:3001/api/categorias/${editingCategory.id}`
                : 'http://localhost:3001/api/categorias';
            
            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(categoryData)
            });

            if (res.status === 401 || res.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || `Error al ${isEditing ? 'actualizar' : 'crear'} la categoría`);
            }

            const categoryResponse = await res.json();
            
            if (isEditing) {
                // Actualizar la categoría en la lista
                setCategorias(prev => prev.map(c => 
                    c.id === editingCategory.id ? categoryResponse : c
                ));
                alert('Categoría actualizada exitosamente');
            } else {
                // Agregar la nueva categoría a la lista
                setCategorias(prev => [...prev, categoryResponse]);
                alert('Categoría creada exitosamente');
            }
            
            // Limpiar el formulario y resetear estado
            resetForm();
            
        } catch (error) {
            console.error('Error with category:', error);
            alert(`Error al ${editingCategory ? 'actualizar' : 'crear'} la categoría: ${error.message}`);
        } finally {
            setFormLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            nombre: '',
            descripcion: ''
        });
        setShowForm(false);
        setEditingCategory(null);
    };

    const handleEdit = (categoria) => {
        setEditingCategory(categoria);
        setFormData({
            nombre: categoria.nombre,
            descripcion: categoria.descripcion || ''
        });
        setShowForm(true);
    };

    const handleDelete = async (categoria) => {
        const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar la categoría "${categoria.nombre}"?`);
        
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                navigate('/login');
                return;
            }

            const res = await fetch(`http://localhost:3001/api/categorias/${categoria.id}`, {
                method: 'DELETE',
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
                const errorData = await res.json();
                throw new Error(errorData.message || 'Error al eliminar la categoría');
            }

            // Eliminar la categoría de la lista
            setCategorias(prev => prev.filter(c => c.id !== categoria.id));
            alert('Categoría eliminada exitosamente');

        } catch (error) {
            console.error('Error deleting category:', error);
            alert(`Error al eliminar la categoría: ${error.message}`);
        }
    };

    if (loading) {
        return (
            <div id="categorias-container">
                <h1 className="categorias-title">Lista de Categorías</h1>
                <p className="categorias-loading">Cargando categorías...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div id="categorias-container">
                <h1 className="categorias-title">Lista de Categorías</h1>
                <p className="categorias-error">Error: {error}</p>
                <button className="categorias-button-home" onClick={() => navigate('/')}>Volver al Home</button>
            </div>
        );
    }

    return (
        <div id="categorias-container">
            <h1 className="categorias-title">Lista de Categorías</h1>
            
            {/* Botón para mostrar/ocultar formulario */}
            <div className="categorias-button-wrapper">
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className={`categorias-toggle-form-button ${showForm ? 'categorias-button-cancel' : 'categorias-button-add'}`}
                >
                    {showForm ? 'Cancelar' : 'Agregar Nueva Categoría'}
                </button>
            </div>

            {/* Formulario para crear/editar categoría */}
            {showForm && (
                <div className="categorias-form-container">
                    <h2 className="categorias-form-title">{editingCategory ? 'Editar Categoría' : 'Crear Nueva Categoría'}</h2>
                    <form onSubmit={handleSubmit} className="categorias-form">
                        <div className="categorias-form-grid">
                            <div className="categorias-form-group">
                                <label htmlFor="nombre" className="categorias-label">
                                    Nombre *
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    required
                                    className="categorias-input"
                                />
                            </div>

                            <div className="categorias-form-group">
                                <label htmlFor="descripcion" className="categorias-label">
                                    Descripción
                                </label>
                                <input
                                    type="text"
                                    id="descripcion"
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleInputChange}
                                    className="categorias-input"
                                />
                            </div>
                        </div>

                        <div className="categorias-form-actions">
                            <button 
                                type="submit" 
                                disabled={formLoading}
                                className={`categorias-submit-button ${formLoading ? 'categorias-button-loading' : 'categorias-button-save'}`}
                            >
                                {formLoading ? (editingCategory ? 'Actualizando...' : 'Creando...') : (editingCategory ? 'Actualizar Categoría' : 'Crear Categoría')}
                            </button>
                            <button 
                                type="button" 
                                onClick={resetForm}
                                className="categorias-button-cancel"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Tabla de categorías */}
            {categorias.length === 0 ? (
                <p className="categorias-no-data">No hay categorías disponibles.</p>
            ) : (
                <table className="categorias-table">
                    <thead>
                        <tr className="categorias-table-header-row">
                            <th className="categorias-table-header">ID</th>
                            <th className="categorias-table-header">Nombre</th>
                            <th className="categorias-table-header">Descripción</th>
                            <th className="categorias-table-header">ID Usuario</th>
                            <th className="categorias-table-header">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((categoria) => (
                            <tr key={categoria.id} className="categorias-table-row">
                                <td className="categorias-table-data">{categoria.id}</td>
                                <td className="categorias-table-data">{categoria.nombre}</td>
                                <td className="categorias-table-data">{categoria.descripcion || 'Sin descripción'}</td>
                                <td className="categorias-table-data">{categoria.idUsuario || 'Global'}</td>
                                <td className="categorias-table-data categorias-actions-cell">
                                    <button
                                        onClick={() => handleEdit(categoria)}
                                        className="categorias-button-edit"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(categoria)}
                                        className="categorias-button-delete"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
            <div className="categorias-button-wrapper-bottom">
                <button 
                    onClick={() => navigate('/')}
                    className="categorias-button-home"
                >
                    Volver al Home
                </button>
            </div>
        </div>
    );
}