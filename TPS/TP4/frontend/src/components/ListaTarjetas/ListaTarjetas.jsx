import TarjetaPersona from '../TarjetaPersona/TarjetaPersona';
import './ListaTarjetas.css';

const ListaTarjetas = ({ personas }) => {
  
  return (
    <div className="lista-tarjetas-container">
      

      { (!personas || personas.length === 0) 
      ? <p>No hay personas para mostrar</p> 
      : personas.map((persona) => (
        <TarjetaPersona key={persona.id} persona={persona} />
      )) }
      
    </div>
  );
};

export default ListaTarjetas;