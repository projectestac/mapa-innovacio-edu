import React from 'react';

function FitxaPrograma({ programa }) {

  // Els camps id, nomCurt i color no s'utilitzen
  const { nom, descripcio, link, ambCurr, ambInn, arees, simbol, tipus } = programa;

  return (
    <div>
      <h3>{nom}</h3>
      {simbol &&
        <img className="prog_logo" src={`logos/${simbol}`} alt={nom}></img>
      }
      <p>{descripcio}</p>
      {ambInn.length > 0 &&
        <div className="prog_ambits">
          <h4>Àmbits d'Innovació</h4>
          <ul>{ambInn.map(amb => <li>{amb}</li>)}</ul>
        </div>
      }
      {ambCurr.length > 0 &&
        <div className="prog_ambits">
          <h4>Àmbits curriculars</h4>
          <p>{ambCurr.join(', ')}</p>
        </div>
      }
      {arees.length > 0 &&
        <div className="prog_ambits">
          <h4>Àrees curriculars</h4>
          <p>{arees.join(', ')}</p>
        </div>
      }
      {tipus.length > 0 &&
        <div className="prog_ambits">
          <h4>Nivells educatius</h4>
          <p>{tipus.join(', ')}</p>
        </div>
      }
      {link &&
        <p><a href={link} target="_blank" rel="noopener noreferrer">Més informació sobre el programa</a></p>
      }
    </div>
    // TODO: Cursos escolars, centres en cada curs
  );
}

export default FitxaPrograma;