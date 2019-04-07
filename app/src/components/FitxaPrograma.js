import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBack from '@material-ui/icons/ArrowBack';

function FitxaPrograma({ id, programa, data: { programes, centresByK }, updateGlobalState }) {

  // Find the specified program
  const thisProgram = programes.find(p => p.id === programa);
  if (!thisProgram) {
    updateGlobalState({ error: `No hi ha cap programa amb el codi: ${programa}` });
    return null;
  }

  // Els camps id, nomCurt i color no s'utilitzen
  const { nom, descripcio, link, ambCurr, ambInn, arees, simbol, tipus, centres } = thisProgram;
  const tancaFitxa = () => updateGlobalState({ programa: null });
  const obreCentre = id => () => updateGlobalState({ centre: id });

  return (
    <section id={id} className="seccio programa">
      <Paper className="paper">
        <Button aria-label="Torna" onClick={tancaFitxa} >
          <ArrowBack className="leftIcon" />
          Tots els programes
         </Button>
        <h3>{nom}</h3>
        <div id="descripcio">
          {simbol && <img className="prog_logo" src={`logos/${simbol}`} alt={nom}></img>}
          <p>{descripcio}</p>
        </div>
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
          <ExpansionPanel key={n}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <h5>CURS {curs}</h5>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <ul>
                {centres[curs].map((id, c) => {
                  const centre = centresByK[id];
                  return (
                    <li key={c} >
                      <Button onClick={obreCentre(centre.id)}>{centre.nom} ({centre.municipi})</Button>
                    </li>
                  );
                })}
              </ul>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </Paper>
    </section>
  );
}

export default FitxaPrograma;