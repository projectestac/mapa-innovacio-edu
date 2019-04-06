import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';

function FitxaPrograma({ programa, data: { programes, instancies, centresByK }, closeProg }) {

  // Els camps id, nomCurt i color no s'utilitzen
  const { nom, descripcio, link, ambCurr, ambInn, arees, simbol, tipus, centres } = programa;

  return (
    <div>
      <Button aria-label="Torna" onClick={closeProg}>
        <ArrowBack className="leftIcon" />
        Tots els programes
      </Button>
      <br clear="all" />
      {simbol &&
        <img className="prog_logo" src={`logos/${simbol}`} alt={nom}></img>
      }
      <h3>{nom}</h3>
      <p>{descripcio}</p>
      {ambInn.length > 0 &&
        <div className="prog_ambits">
          <h4>Àmbits d'Innovació</h4>
          <ul>{ambInn.map((amb, n) => <li key={n}>{amb}</li>)}</ul>
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
      <h4>Centres participants</h4>
      {Object.keys(centres).map((curs, n) => (
        <div key={n}>
          <h5>Curs {curs}</h5>
          <ul>
            {centres[curs].map((id, c) => {
              const centre = centresByK[id];
              return <li key={c}>{centre.nom} ({centre.municipi})</li>
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default FitxaPrograma;