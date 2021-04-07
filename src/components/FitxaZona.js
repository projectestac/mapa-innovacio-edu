/*!
 *  File    : components/FitxaZona.js
 *  Created : 02/05/2019
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
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import WebIcon from 'mdi-material-ui/Web';
import MailIcon from '@material-ui/icons/Mail';
import Error from './Error';
import MapSection from './MapSection';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DownloadIcon from 'mdi-material-ui/FileDownload';
import { getOptimalSrc, getInfoSpan, hasExtraInfo, csvExportToFile, muniComarca, jumpTo } from '../utils/Utils';


function FitxaZona({ history, match: { params: { key } } }) {

  return (
    <AppContext.Consumer>
      {({ data, cursos, currentPrograms, polygons, mapChanged, updateMap,
        settings: { HASH, HOMEPAGE, APP_BASE, EMBED, EMBED_MAP, PRJLOGOS_PATH } }) => {

        /**
         * Export the list of schools into a CSV spreadsheet
         */
        function exportData(programesArray, centresInn, nomcurt) {

          const fields = [
            { name: 'CODI', id: 'codi' },
            { name: 'CENTRE', id: 'centre' },
            { name: 'CURS', id: 'curs' },
            { name: 'PROGRAMA', id: 'programa' },
            { name: 'TITOL', id: 'titol' },
            { name: 'INFO', id: 'url' },
          ];

          const csvData = programesArray.reduce((total, programa) => {
            const { centres, info } = programa;
            return Object.keys(centres).reduce((result, curs) => {
              centres[curs].filter(c => centresInn.has(c)).forEach(centre => {
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
            }, total);
          }, []);

          return csvExportToFile(
            `programes-${nomcurt.trim().replace(/ /g, '_')}.csv`,
            csvData,
            fields,
          );
        }

        // Find the specified program
        const zona = data.poligons.get(key);
        if (!zona)
          return <Error {...{ error: `No hi ha cap zona amb el codi: ${key}`, history }} />

        // Els camps id, nomCurt i color no s'utilitzen
        const { tipus, nom, nomcurt, logo, cp, adreca, municipi, comarca, tel, fax, correu, web, centresInn, programes } = zona;
        const programesArray = Array.from(programes).sort((a, b) => a.nom.localeCompare(b.nom));

        const torna = () => history.goBack();

        return (
          <>
            <Helmet>
              <title>{`${nom} - Mapa de la innovació pedagògica de Catalunya`}</title>
              <meta name="description" content={`Programes, projectes i pràctiques d'innovació pedagògica - ${nom}`} />
            </Helmet>
            {!EMBED &&
              <Button className="torna" aria-label="Torna" onClick={torna} >
                <ArrowBack className="left-icon" />
                Torna
            </Button>
            }
            {!EMBED_MAP &&
              <section className="seccio zona">
                <Paper className="paper">
                  <div className="logo-nom-seccio">
                    {logo &&
                      <img
                        className={`seccio-logo ${tipus === 'ST' ? '' : 'se-logo'}`}
                        src={getOptimalSrc(`${/^http.?:\/\//.test(logo) ? logo : `${PRJLOGOS_PATH}${logo}`}`)}
                        alt={nom}
                      />}
                    <div className="nom-seccio">
                      <Typography variant="h4">{nom}</Typography>
                    </div>
                  </div>
                  <div className="adreca">
                    <p>
                      {adreca}<br />
                      {`${cp} ${muniComarca(municipi, comarca)}`}<br />
                      {tel && <>Tel: <a href={`tel:+34 ${tel}`} rel="nofollow">{tel}</a><br /></>}
                      {fax && <>{`Fax: ${fax}`}<br /></>}
                    </p>
                  </div>
                  <div id="info">
                    {web &&
                      <Button
                        variant="contained"
                        className="info-btn"
                        href={web}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={web}
                      >
                        <WebIcon className="left-icon" />
                        Web
                    </Button>
                    }
                    {correu &&
                      <Button
                        variant="contained"
                        className="info-btn"
                        href={`mailto:${correu}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={correu}
                      >
                        <MailIcon className="left-icon" />
                        Contacte
                    </Button>
                    }
                  </div>
                  <Typography variant="h6">Programes amb presència en aquest territori</Typography>
                  <br />
                  {programesArray.map((prog, n) => {
                    const centres = prog.allCentres.filter(c => centresInn.has(c));
                    const numCentres = centres.length;
                    return (
                      <Accordion key={n}>
                        <AccordionSummary classes={{ root: 'small-padding-h no-break', content: 'zona-prog' }} expandIcon={<ExpandMoreIcon />}>
                          <Link className="zona-prog-logo" to={`/programa/${prog.id}`}>
                            <Avatar src={getOptimalSrc(`${PRJLOGOS_PATH}mini/${prog.simbol}`)} alt={prog.nom} />
                          </Link>
                          <Typography className="wider">{prog.nom}</Typography>
                          <Typography>{`${numCentres} centre${numCentres === 1 ? '' : 's'}`}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="small-padding-h">
                          <List>
                            {centres.map(({ id, nom, municipi, info, allPrograms }, n) => {
                              const link = `/${HASH}centre/${id}`;
                              const withInfo = info && hasExtraInfo(info[prog.id]);
                              return (
                                <ListItem key={n} button className="small-padding-h"
                                  component={withInfo ? 'div' : 'a'}
                                  href={`${HOMEPAGE}${link}`}
                                  onClick={withInfo ? jumpTo(link, history) : null} >
                                  <ListItemText
                                    primary={`${nom} (${municipi})`}
                                    secondary={info && info[prog.id] && getInfoSpan(info[prog.id], prog.id, id)}
                                  />
                                </ListItem>
                              );
                            })}
                          </List>
                        </AccordionDetails>
                      </Accordion>
                    )
                  })}
                  <br />
                  <Button
                    variant="contained"
                    className="csv-btn"
                    title='Descarrega la llista de programes i centres en format CSV'
                    onClick={() => exportData(programesArray, centresInn, nomcurt)}
                  >
                    <DownloadIcon className="left-icon" />
                    CSV
                </Button>

                </Paper>
              </section>
            }
            <MapSection {...{ data, programa: null, centre: null, zona: key, cursos, currentPrograms, polygons, mapChanged, updateMap }} />
          </>
        );
      }}
    </AppContext.Consumer>
  );
}

export default FitxaZona;
