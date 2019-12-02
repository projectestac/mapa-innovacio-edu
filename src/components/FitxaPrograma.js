/*!
 *  File    : components/FitxaPrograma.js
 *  Created : 10/04/2019
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  Map of pedagogical innovation in Catalonia 
 *  https://innovacio.xtec.gencat.cat
 *
 *  @source https://github.com/projectestac/mapa-innovacio-edu
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2019 Educational Telematic Network of Catalonia (XTEC)
 *
 *  Licensed under the EUPL, Version 1.2 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 */

import React from 'react';
import Helmet from 'react-helmet';
import ReactMarkdown from 'react-markdown/with-html';
import { AppContext } from '../App';
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
import DocumentIcon from 'mdi-material-ui/FileDocument';
import InfoIcon from '@material-ui/icons/Info';
import MailIcon from '@material-ui/icons/Mail';
import DownloadIcon from 'mdi-material-ui/FileDownload';
import Error from './Error';
import MapSection from './MapSection';
import { getInfoSpan, hasExtraInfo, csvExportToFile } from '../utils/Utils';

// Programs with schools list expanded by default
const EXPANDED_PROGS = [
  "1001" // "Reconeixement de projectes d'innovació pedagògica"
];

// Maximum number of expected expansion panels (increase it if needed!)
const MAX_EXPANSION_PANELS = 25;

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
        <Typography variant="h6">{title}</Typography>
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

  const SMALL_SCREEN = window.matchMedia('(max-width: 840px)').matches;
  const [expandedPanels, setExpandedPanels] = React.useState((new Array(MAX_EXPANSION_PANELS)).fill(!SMALL_SCREEN && EXPANDED_PROGS.includes(id), 0, 10));
  const expandPanel = n => _ev => setExpandedPanels(expandedPanels.map((p, i) => (i === n) ? !p : p));

  return (
    <AppContext.Consumer>
      {({ data, data: { programes, estudis, ambitsCurr, ambitsInn },
        cursos, currentPrograms, polygons, mapChanged, updateMap,
        settings: { HASH, HOMEPAGE, FITXA_BASE, APP_BASE, EMBED, EMBED_MAP } }) => {

        /**
         * Export the list of schools into a CSV spreadsheet
         */
        function exportData(programa) {

          const { centres, info } = programa;

          const fields = [
            { name: 'CODI', id: 'codi' },
            { name: 'CENTRE', id: 'centre' },
            { name: 'CURS', id: 'curs' },
            { name: 'PROGRAMA', id: 'programa' },
          ];

          if (info) {
            fields.push({ name: 'TITOL', id: 'titol' });
            fields.push({ name: 'INFO', id: 'url' });
          }

          const csvData = Object.keys(centres).reduce((result, curs) => {
            centres[curs].forEach(centre => {
              const inf = info && info[centre.id] && info[centre.id].find(i => i.curs === curs);
              result.push({
                centre: `${centre.nom} (${centre.municipi})`,
                codi: centre.id,
                curs,
                programa: programa.nom,
                titol: inf ? inf.titol : '',
                url: inf ? `${APP_BASE}projecte/${programa.id}|${centre.id}|${inf.num || 0}` : '',
              });
            });
            return result;
          }, []);

          return csvExportToFile(
            `centres-${programa.nomCurt}.csv`,
            csvData,
            fields,
          );
        }

        // Find the specified program
        const programa = programes.get(id);
        if (!programa)
          return <Error {...{ error: `No hi ha cap programa amb el codi: ${id}`, history }} />

        // Deconstruct `programa`
        const {
          nom, descripcio,
          link,
          ambCurr, ambInn,
          fitxa, video,
          objectius, requisits, compromisos, contacte, normativa, arees,
          simbol, tipus,
          centres
        } = programa;

        return (
          <>
            <Helmet>
              <title>{`${nom} - Mapa de la innovació pedagògica de Catalunya`}</title>
            </Helmet>
            {!EMBED &&
              <Button className="torna" aria-label="Torna" onClick={() => history.goBack()} >
                <ArrowBack className="left-icon" />
                Torna
            </Button>
            }
            {!EMBED_MAP &&
              <section className="seccio programa">
                <Paper className="paper">
                  <div className="logo-nom-seccio">
                    {simbol && <img className="seccio-logo" src={`${HOMEPAGE}/logos/${simbol}`} alt={nom} />}
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
                        <DocumentIcon className="left-icon" />
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
                      <ExpansionPanel key={n} expanded={expandedPanels[n]}>
                        <ExpansionPanelSummary className="small-padding-h" expandIcon={<ExpandMoreIcon />} onClick={expandPanel(n)}>
                          <Typography className="wider">{`CURS ${curs}`}</Typography>
                          <Typography>{`${centres[curs].length} ${centres[curs].length === 1 ? 'centre' : 'centres'}`}</Typography>
                        </ExpansionPanelSummary>
                        {expandedPanels[n] &&
                          <ExpansionPanelDetails className="small-padding-h flow-v">
                            <List className="wider">
                              {centres[curs].sort((a, b) => a.nom.localeCompare(b.nom)).map(({ id: codi, nom, municipi, info, notCert }, c) => {
                                const link = (info && hasExtraInfo(info[id])) ? null : `${HOMEPAGE}/${HASH}centre/${codi}`;
                                const nc = notCert.has(`${id}|${curs}`);
                                hasNc = hasNc || nc;
                                return (
                                  <ListItem key={c} button component={link ? 'a' : 'div'} href={link} className="small-padding-h">
                                    <ListItemText
                                      primary={`${nom} (${municipi})${nc ? ' *' : ''}`}
                                      secondary={info && info[id] && getInfoSpan(info[id], id, codi)}
                                    />
                                  </ListItem>
                                )
                              }
                              )}
                            </List>
                            {hasNc &&
                              <>
                                <Divider />
                                <Typography color="secondary" className="padding-one">*: Participació en curs</Typography>
                              </>
                            }
                          </ExpansionPanelDetails>
                        }
                      </ExpansionPanel>
                    );
                  })}
                  <br />
                  <Button
                    variant="contained"
                    className="csv-btn"
                    title='Descarrega la llista de centres en format CSV'
                    onClick={() => exportData(programa)}
                  >
                    <DownloadIcon className="left-icon" />
                    CSV
                  </Button>
                </Paper>
              </section>
            }
            <MapSection {...{ data, programa: id, centre: null, zona: null, cursos, currentPrograms, polygons, mapChanged, updateMap }} />
          </>
        );
      }}
    </AppContext.Consumer>
  );
}

export default FitxaPrograma;
