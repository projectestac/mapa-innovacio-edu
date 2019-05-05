import React from 'react';
import AppContext from '../AppContext';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Error from './Error';
import MapSection from './MapSection';

function FitxaPrograma({ history, match: { params: { id } } }) {

  return (
    <AppContext.Consumer>
      {({ data, cursos, currentPrograms, polygons, mapChanged, updateMap }) => {
        // Find the specified program
        const programa = data.programes.get(id);
        if (!programa)
          return <Error {...{ error: `No hi ha cap programa amb el codi: ${id}`, history }} />

        // Els camps id, nomCurt i color no s'utilitzen
        const { nom, descripcio, link, ambCurr, ambInn, arees, simbol, tipus, centres } = programa;

        const torna = () => history.goBack();

        return (
          <>
            <Button className="torna" aria-label="Torna" onClick={torna} >
              <ArrowBack className="leftIcon" />
              Torna
            </Button>
            <section className="seccio programa">
              <Paper className="paper">
                <h3>{nom}</h3>
                <div id="descripcio">
                  {simbol && <img className="prog_logo" src={`logos/${simbol}`} alt={nom}></img>}
                  <p>{descripcio}</p>
                  <br clear="all" />
                </div>
                {ambInn.length > 0 &&
                  <div className="prog_ambits">
                    <h4>Àmbits d'innovació:</h4>
                    <ul>
                      {ambInn.map((a, n) => <li key={n}>{a}</li>)}
                    </ul>
                  </div>
                }
                {ambCurr.length > 0 &&
                  <div className="prog_ambits">
                    <h4>Àmbits curriculars:</h4>
                    <ul>
                      {ambCurr.map((a, n) => <li key={n}>{a}</li>)}
                    </ul>
                  </div>
                }
                {arees.length > 0 &&
                  <div className="prog_ambits">
                    <h4>Àrees curriculars:</h4>
                    <ul>
                      {arees.map((a, n) => <li key={n}>{a}</li>)}
                    </ul>
                  </div>
                }
                {tipus.length > 0 &&
                  <div className="prog_ambits">
                    <h4>Nivells educatius:</h4>
                    <ul>
                      {tipus.map((t, n) => <li key={n}>{data.estudis.get(t)}</li>)}
                    </ul>
                  </div>
                }
                {link &&
                  <p><a href={link} target="_blank" rel="noopener noreferrer">Més informació sobre el programa</a></p>
                }
                <h4>Centres participants:</h4>
                <br />
                {Object.keys(centres).map((curs, n) => (
                  <ExpansionPanel key={n}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className="wider">{`CURS ${curs}`}</Typography>
                      <Typography>{`${centres[curs].length} ${centres[curs].length === 1 ? 'centre' : 'centres'}`}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="small-padding-h">
                      <List dense>
                        {centres[curs].sort((a, b) => a.nom.localeCompare(b.nom)).map(({ id: codi, nom, municipi, titols }, c) => (
                          <ListItem key={c} button component="a" href={`#/centre/${codi}`} className="small-padding-h">
                            <ListItemText
                              primary={`${nom} (${municipi})`}
                              secondary={(titols && titols[id] ? titols[id] : null)}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ))}
              </Paper>
            </section>
            <MapSection {...{ data, programa: id, centre: null, zona: null, cursos, currentPrograms, polygons, mapChanged, history, updateMap }} />
          </>
        );
      }}
    </AppContext.Consumer>
  );
}

export default FitxaPrograma;
