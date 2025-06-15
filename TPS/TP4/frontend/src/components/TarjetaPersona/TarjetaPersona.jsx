import './TarjetaPersona.css';

const TarjetaPersona = ({ persona }) => {
  return (
    <div className="tarjeta-persona">
      <h2>{persona.nombre} {persona.apellido}</h2>
      <p>{persona.edad} años</p>
      <p>{persona.email}</p>
    </div>
  );
};

export default TarjetaPersona;