import { useState, useEffect } from 'react';
import { getProductos } from '../services/productoService';
import { getCategorias } from '../services/categoriaService';
import { getMovimientos } from '../services/movimientoService';

export default function useInventario() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getProductos(),
      getCategorias(),
      getMovimientos()
    ])
      .then(([prod, cat, mov]) => {
        setProductos(prod);
        setCategorias(cat);
        setMovimientos(mov);
      })
      .catch(() => setError('Error al cargar datos'))
      .finally(() => setLoading(false));
  }, []);

  return { productos, categorias, movimientos, loading, error };
}
