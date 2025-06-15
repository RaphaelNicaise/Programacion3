// src/components/TraerPersonas.jsx
import './TraerPersona.css'
import { useState, useEffect } from 'react';
import ListaTarjetas from '../ListaTarjetas/ListaTarjetas';

const TraerPersonas = () => {
  const [personas, setPersonas] = useState([]);
  const [cargandoPersonas, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersona = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/personas');

        const data = await response.json();
        setPersonas(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPersona();
  }, []);

  if (cargandoPersonas) return <p>Cargando personas...</p>
  if (error) return <p>Error al cargar las personas</p> 

  return (
    <>
      <h1 className="title">Listado de Personas</h1>
      <ListaTarjetas personas={personas} />
    </>
  );
};

export default TraerPersonas;