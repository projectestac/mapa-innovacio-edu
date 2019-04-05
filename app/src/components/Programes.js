import React from 'react';
import FitxaPrograma from './FitxaPrograma';

function Programes({ id, data, programa }) {

  const { programes } = data;

  const [prog, setProg] = React.useState(programa);

  const handleProgClick = id => ev => setProg(id);

  return (
    <section id={id} className="seccio projectes">
      <h2>Programes</h2>
      {
        (prog && <FitxaPrograma {...{ data, programa: programes.find(p => p.id === prog) }} />) ||
        <ul>
          {programes.map((prog, n) => {
            return (
              <li key={n} onClick={handleProgClick(prog.id)}>{prog.nom}</li>
            );
          })}
        </ul>
      }
    </section>
  );
}

export default Programes;