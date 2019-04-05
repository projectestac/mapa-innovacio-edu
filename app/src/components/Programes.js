import React from 'react';
import FitxaPrograma from './FitxaPrograma';

function Programes({ id, programes, programa }) {

  const [prog, setProg] = React.useState(programa);

  const handleProgClick = id => ev => setProg(id);

  return (
    <section id={id} className="seccio projectes">
      <h2>Programes</h2>
      {
        (prog && <FitxaPrograma programa={programes.find(p => p.id === prog)} />) ||
        <ul>
          {programes.map((prog, n) => {
            return (
              <li onClick={handleProgClick(prog.id)}>{prog.nom}</li>
            );
          })}
        </ul>
      }
    </section>
  );
}

export default Programes;