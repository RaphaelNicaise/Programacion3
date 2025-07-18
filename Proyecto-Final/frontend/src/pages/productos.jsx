import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/productos.css';

export default function Productos() {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        precioCompra: '',
        precioVenta: '',
        stock: 0,
        idCategoria: '',
        activo: true
    });
    const [formLoading, setFormLoading] = useState(false);
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [busquedaCategoria, setBusquedaCategoria] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const token = localStorage.getItem('token');
                
                if (!token) {
                    navigate('/login');
                    return;
                }
                
                // Obtener productos y categorías en paralelo
                const [productosRes, categoriasRes] = await Promise.all([
                    fetch('http://localhost:3001/api/productos', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }),
                    fetch('http://localhost:3001/api/categorias', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    })
                ]);
                
                if (productosRes.status === 401 || productosRes.status === 403 || 
                    categoriasRes.status === 401 || categoriasRes.status === 403) {
                    localStorage.removeItem('token');
                    navigate('/login');
                    return;
                }
                
                if (!productosRes.ok || !categoriasRes.ok) {
                    throw new Error('Error al obtener datos');
                }
                
                const productosData = await productosRes.json();
                const categoriasData = await categoriasRes.json();
                
                setProductos(productosData);
                setCategorias(categoriasData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, navigate]);

    // Función para obtener el nombre de la categoría
    const getNombreCategoria = (idCategoria) => {
        if (!idCategoria) return 'Sin categoría';
        const categoria = categorias.find(cat => cat.id === idCategoria);
        return categoria ? categoria.nombre : 'Categoría no encontrada';
    };

    // Filtrar productos por categoría
    const productosFiltrados = productos.filter(producto => {
        const cumpleFiltroCategoria = filtroCategoria === '' || 
            producto.idCategoria === parseInt(filtroCategoria);
        
        const cumpleBusqueda = busquedaCategoria === '' || 
            getNombreCategoria(producto.idCategoria).toLowerCase().includes(busquedaCategoria.toLowerCase());
        
        return cumpleFiltroCategoria && cumpleBusqueda;
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
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
            if (!formData.nombre || !formData.precioCompra || !formData.precioVenta) {
                alert('Por favor completa todos los campos obligatorios');
                return;
            }

            if (parseFloat(formData.precioCompra) <= 0 || parseFloat(formData.precioVenta) <= 0) {
                alert('Los precios deben ser mayores a 0');
                return;
            }

            const productData = {
                nombre: formData.nombre,
                precioCompra: parseFloat(formData.precioCompra),
                precioVenta: parseFloat(formData.precioVenta),
                stock: parseInt(formData.stock) || 0,
                idCategoria: formData.idCategoria ? parseInt(formData.idCategoria) : null,
                activo: formData.activo,
                idUsuario: user.id
            };

            const isEditing = editingProduct !== null;
            const url = isEditing 
                ? `http://localhost:3001/api/productos/${editingProduct.id}`
                : 'http://localhost:3001/api/productos';
            
            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (res.status === 401 || res.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || `Error al ${isEditing ? 'actualizar' : 'crear'} el producto`);
            }

            const productResponse = await res.json();
            
            if (isEditing) {
                setProductos(prev => prev.map(p => 
                    p.id === editingProduct.id ? productResponse : p
                ));
                alert('Producto actualizado exitosamente');
            } else {
                setProductos(prev => [...prev, productResponse]);
                alert('Producto creado exitosamente');
            }
            
            resetForm();
            
        } catch (error) {
            console.error('Error with product:', error);
            alert(`Error al ${editingProduct ? 'actualizar' : 'crear'} el producto: ${error.message}`);
        } finally {
            setFormLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            nombre: '',
            precioCompra: '',
            precioVenta: '',
            stock: 0,
            idCategoria: '',
            activo: true
        });
        setShowForm(false);
        setEditingProduct(null);
    };

    const handleEdit = (producto) => {
        setEditingProduct(producto);
        setFormData({
            nombre: producto.nombre,
            precioCompra: producto.precioCompra.toString(),
            precioVenta: producto.precioVenta.toString(),
            stock: producto.stock,
            idCategoria: producto.idCategoria ? producto.idCategoria.toString() : '',
            activo: producto.activo
        });
        setShowForm(true);
    };

    const handleDelete = async (producto) => {
        const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar el producto "${producto.nombre}"?`);
        
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                navigate('/login');
                return;
            }

            const res = await fetch(`http://localhost:3001/api/productos/${producto.id}`, {
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
                throw new Error(errorData.message || 'Error al eliminar el producto');
            }

            setProductos(prev => prev.filter(p => p.id !== producto.id));
            alert('Producto eliminado exitosamente');

        } catch (error) {
            console.error('Error deleting product:', error);
            alert(`Error al eliminar el producto: ${error.message}`);
        }
    };

    const limpiarFiltros = () => {
        setFiltroCategoria('');
        setBusquedaCategoria('');
    };

    if (loading) {
        return (
            <div id="productos-container">
                <h1 className="productos-title">Lista de Productos</h1>
                <p className="loading-message">Cargando productos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div id="productos-container">
                <h1 className="productos-title">Lista de Productos</h1>
                <p className="error-message">Error: {error}</p>
                <button onClick={() => navigate('/')} className="button-back-home">Volver al Home</button>
            </div>
        );
    }

    return (
        <div id="productos-container">
            <h1 className="productos-title">Lista de Productos</h1>
            
            <div className="form-toggle-section">
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className={showForm ? 'button-cancel' : 'button-add-new'}
                >
                    {showForm ? 'Cancelar' : 'Agregar Nuevo Producto'}
                </button>
            </div>

            <div className="filters-section">
                <h3 className="filters-title">Filtros</h3>
                <div className="filters-grid">
                    <div className="filter-item">
                        <label htmlFor="filtroCategoria" className="filter-label">
                            Filtrar por Categoría:
                        </label>
                        <select
                            id="filtroCategoria"
                            value={filtroCategoria}
                            onChange={(e) => setFiltroCategoria(e.target.value)}
                            className="filter-select"
                        >
                            <option value="">Todas las categorías</option>
                            {categorias.map(categoria => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="filter-item">
                        <label htmlFor="busquedaCategoria" className="filter-label">
                            Buscar por Categoría:
                        </label>
                        <input
                            type="text"
                            id="busquedaCategoria"
                            value={busquedaCategoria}
                            onChange={(e) => setBusquedaCategoria(e.target.value)}
                            placeholder="Escribe nombre de categoría..."
                            className="filter-input"
                        />
                    </div>
                    
                    <div className="filter-actions">
                        <button 
                            onClick={limpiarFiltros}
                            className="button-clear-filters"
                        >
                            Limpiar Filtros
                        </button>
                    </div>
                </div>
                
                {(filtroCategoria || busquedaCategoria) && (
                    <div className="filter-results-info">
                        Mostrando {productosFiltrados.length} de {productos.length} productos
                    </div>
                )}
            </div>

            {showForm && (
                <div className="product-form-section">
                    <h2 className="form-title">{editingProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}</h2>
                    <form onSubmit={handleSubmit} className="product-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="nombre" className="form-label">
                                    Nombre *
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="idCategoria" className="form-label">
                                    Categoría
                                </label>
                                <select
                                    id="idCategoria"
                                    name="idCategoria"
                                    value={formData.idCategoria}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="">Sin categoría</option>
                                    {categorias.map(categoria => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="precioCompra" className="form-label">
                                    Precio Compra *
                                </label>
                                <input
                                    type="number"
                                    id="precioCompra"
                                    name="precioCompra"
                                    value={formData.precioCompra}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    min="0"
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="precioVenta" className="form-label">
                                    Precio Venta *
                                </label>
                                <input
                                    type="number"
                                    id="precioVenta"
                                    name="precioVenta"
                                    value={formData.precioVenta}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    min="0"
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="stock" className="form-label">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                    min="0"
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group form-group-checkbox">
                                <label className="form-label">
                                    Estado
                                </label>
                                <div className="checkbox-wrapper">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="activo"
                                            checked={formData.activo}
                                            onChange={handleInputChange}
                                            className="form-checkbox"
                                        />
                                        Producto Activo
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button 
                                type="submit" 
                                disabled={formLoading}
                                className="button-submit"
                            >
                                {formLoading ? (editingProduct ? 'Actualizando...' : 'Creando...') : (editingProduct ? 'Actualizar Producto' : 'Crear Producto')}
                            </button>
                            <button 
                                type="button" 
                                onClick={resetForm}
                                className="button-cancel-form"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {productosFiltrados.length === 0 ? (
                <p className="no-products-message">No hay productos disponibles{(filtroCategoria || busquedaCategoria) ? ' que coincidan con los filtros.' : '.'}</p>
            ) : (
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio Compra</th>
                            <th>Precio Venta</th>
                            <th>Stock</th>
                            <th>Categoría</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosFiltrados.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td>{producto.nombre}</td>
                                <td>${producto.precioCompra}</td>
                                <td>${producto.precioVenta}</td>
                                <td>{producto.stock}</td>
                                <td>{getNombreCategoria(producto.idCategoria)}</td>
                                <td>
                                    <span className={producto.activo ? 'status-active' : 'status-inactive'}>
                                        {producto.activo ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td className="actions-cell">
                                    <button
                                        onClick={() => handleEdit(producto)}
                                        className="button-edit"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(producto)}
                                        className="button-delete"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
            <div className="back-home-section">
                <button 
                    onClick={() => navigate('/')}
                    className="button-back-home"
                >
                    Volver al Home
                </button>
            </div>
        </div>
    );
}