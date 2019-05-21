import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
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
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBack from '@material-ui/icons/ArrowBack';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import InfoIcon from '@material-ui/icons/Info';
import MailIcon from '@material-ui/icons/Mail';
import Error from './Error';
import MapSection from './MapSection';
import { getInfoSpan } from '../utils/Utils';

const FITXA_BASE = process.env.REACT_APP_FITXA_BASE || 'https://clic.xtec.cat/pub/fitxes/';

// Options for React-Markdown
// See: https://github.com/rexxars/react-markdown#options
const MD_OPTIONS = {
  escapeHtml: false,
};

// Creates a Material-UI expansion panel with the provided title and content
function createExpansionPanel(className, title, content) {
  return (
    <ExpansionPanel className={className}>
      <ExpansionPanelSummary className="small-padding-h" expandIcon={<ExpandMoreIcon />}>
        <h4 style={{ marginTop: 0 }}>{title}</h4>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className="small-padding-h">
        {content}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

// Same as `createExpansionPanel`, but with Markdown content
function createMDExpansionPanel(className, title, mdContent) {
  return createExpansionPanel(className, title,
    <div>
      <ReactMarkdown {...MD_OPTIONS}>
        {mdContent}
      </ReactMarkdown>
    </div>
  );
}

function FitxaPrograma({ history, match: { params: { id } } }) {

  return (
    <AppContext.Consumer>
      {({ data, cursos, currentPrograms, polygons, mapChanged, updateMap }) => {
        const { programes, estudis, ambitsCurr, ambitsInn } = data;

        // Find the specified program
        const programa = programes.get(id);
        if (!programa)
          return <Error {...{ error: `No hi ha cap programa amb el codi: ${id}`, history }} />

        // Deconstruct `programa`
        const { nom, descripcio, link, ambCurr, ambInn, fitxa, video, objectius, requisits, compromisos, contacte, normativa, arees, simbol, tipus, centres } = programa;

        return (
          <>
            <Button className="torna" aria-label="Torna" onClick={() => history.goBack()} >
              <ArrowBack className="left-icon" />
              Torna
            </Button>
            <section className="seccio programa">
              <Paper className="paper">
                <div className="logo-nom-seccio">
                  {simbol && <img className="seccio-logo" src={`logos/${simbol}`} alt={nom} />}
                  <div className="nom-seccio">
                    <Typography variant="h4">{nom}</Typography>
                  </div>
                </div>
                <div id="descripcio">
                  <ReactMarkdown {...MD_OPTIONS}>
                    {descripcio}
                  </ReactMarkdown>
                </div>
                <div id="info">
                  {fitxa &&
                    <Button
                      variant="contained"
                      className="info-btn"
                      href={`${/^http.?:\/\//.test(fitxa) ? '' : FITXA_BASE}${fitxa}`}
                      title="Descarrega la fitxa del projecte" >
                      <CloudDownloadIcon className="left-icon" />
                      Fitxa
                    </Button>
                  }
                  {link &&
                    <Button
                      variant="contained"
                      className="info-btn"
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={link}>
                      <InfoIcon className="left-icon" />
                      Web
                    </Button>
                  }
                  {contacte &&
                    <Button
                      variant="contained"
                      className="info-btn"
                      href={`mailto:${contacte}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={contacte}>
                      <MailIcon className="left-icon" />
                      Contacte
                    </Button>
                  }
                  {video &&
                    <div className="prog-video">
                      <br />
                      <ReactMarkdown {...MD_OPTIONS}>
                        {video}
                      </ReactMarkdown>
                    </div>
                  }
                </div>
                {objectius && createMDExpansionPanel('prog-objectius', 'Objectius', objectius)}
                {requisits && createMDExpansionPanel('prog-requisits', 'Requisits', requisits)}
                {compromisos && createMDExpansionPanel('prog-compromisos', 'Compromisos', compromisos)}
                {normativa && createMDExpansionPanel('prog-normativa', 'Normativa', normativa)}
                {createExpansionPanel('prog-ambits', 'Àmbits, àrees i nivells', (
                  <div>
                    {ambInn.length > 0 &&
                      <div className="prog_ambits">
                        <h4>Àmbits d'innovació:</h4>
                        <ul>
                          {ambInn.map(a => <li key={a}>{ambitsInn.get(a)}</li>)}
                        </ul>
                      </div>
                    }
                    {ambCurr.length > 0 &&
                      <div className="prog_ambits">
                        <h4>Àmbits curriculars:</h4>
                        <ul>
                          {ambCurr.map(a => <li key={a}>{ambitsCurr.get(a)}</li>)}
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
                          {tipus.map((t, n) => <li key={n}>{estudis.get(t)}</li>)}
                        </ul>
                      </div>
                    }
                  </div>
                ))}
                <br />
                {Object.keys(centres).sort().map((curs, n) => {
                  let hasNc = false;
                  return (
                    <ExpansionPanel key={n}>
                      <ExpansionPanelSummary className="small-padding-left" expandIcon={<ExpandMoreIcon />}>
                        <Typography className="wider">{`CURS ${curs}`}</Typography>
                        <Typography>{`${centres[curs].length} ${centres[curs].length === 1 ? 'centre' : 'centres'}`}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className="small-padding-h flow-v">
                        <List className="wider">
                          {centres[curs].sort((a, b) => a.nom.localeCompare(b.nom)).map(({ id: codi, nom, municipi, info, notCert }, c) => {
                            const nc = notCert.has(`${id}|${curs}`);
                            hasNc = hasNc || nc;
                            return (
                              <ListItem key={c} button component="a" href={`#/centre/${codi}`} className="small-padding-h">
                                <ListItemText
                                  primary={`${nom} (${municipi})${nc ? ' *' : ''}`}
                                  secondary={(info && info[id] ? getInfoSpan(info[id]) : null)}
                                />
                              </ListItem>
                            )
                          }
                          )}
                        </List>
                        {hasNc &&
                          <>
                            <Divider />
                            <Typography className="padding-one">*: Participació en curs, pendent de certificar</Typography>
                          </>
                        }
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  );
                })}
              </Paper>
            </section>
            <MapSection {...{ data, programa: id, centre: null, zona: null, cursos, currentPrograms, polygons, mapChanged, updateMap }} />
          </>
        );
      }}
    </AppContext.Consumer>
  );
}

export default FitxaPrograma;
