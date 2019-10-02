/*!
 *  File    : components/FitxaCentre.js
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
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import WebIcon from 'mdi-material-ui/Web';
import MailIcon from '@material-ui/icons/Mail';
import TwitterIcon from 'mdi-material-ui/Twitter';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import { plainArray, getInfoSpan, hasExtraInfo, csvExportToFile } from '../utils/Utils';
import Error from './Error';
import MapSection from './MapSection';
import { homepage } from '../package.json';

const LOGO_BASE = process.env.REACT_APP_LOGO_BASE || 'https://clic.xtec.cat/pub/logos/';
const HASH_TYPE = process.env.REACT_APP_HASH_TYPE || "slash";
const HASH = HASH_TYPE === 'no-hash' ? '' : HASH_TYPE === 'hashbang' ? '#!/' : HASH_TYPE === 'slash' ? '#/' : '#';

/**
 * Export the list of programs to a CSV spreadsheet
 */
function exportData(centre) {
  const { programes, info } = centre;

  const fields = [
    { name: 'CODI', id: 'codi' },
    { name: 'CENTRE', id: 'centre' },
    { name: 'CURS', id: 'curs' },
    { name: 'PROGRAMA', id: 'programa' },
    { name: 'INFO', id: 'url' }
  ];

  if (info)
    fields.push({ name: 'TITOL', id: 'titol' });

  const base = `${window.location.origin}${homepage}/${HASH}`;
  const nomCentre = `${centre.nom} (${centre.municipi})`;

  const data = Object.keys(programes).reduce((result, curs) => {
    programes[curs].forEach(prog => {
      const inf = info && info[prog.id] && info[prog.id].find(i => i.curs === curs);
      result.push({
        centre: nomCentre,
        codi: centre.id,
        curs,
        programa: prog.nom,
        url: inf ? `${base}projecte/${prog.id}|${centre.id}|${inf.num || 0}` : `${base}programa/${prog.id}`,
        titol: inf ? inf.titol : '',
      });
    });
    return result;
  }, []);

  return csvExportToFile(
    `programes-${centre.id}.csv`,
    data,
    fields,
  );
}

function FitxaCentre({ history, match: { params: { codi } } }) {
  return (
    <AppContext.Consumer>
      {({ embed, embedMap, data, currentPrograms, polygons, mapChanged, updateMap }) => {
        // Find the specified program
        const centre = data.centres.get(codi);
        if (!centre)
          return <Error {...{ error: `No hi ha cap programa amb el codi: ${codi}`, history }} />

        const { nom, municipi, comarca, estudis, adreca, web, logo, tel, mail, twitter, sstt, se, pb, programes, info, notCert } = centre;
        const tancaFitxa = () => history.goBack();
        const servei_territorial = data.poligons.get(sstt);
        const servei_educatiu = data.poligons.get(se);
        let hasNc = false;

        return (
          <>
            <Helmet>
              <title>{`${nom} - Mapa de la innovació pedagògica de Catalunya`}</title>
              <meta name="description" content={`Programes, projectes i pràctiques d'innovació pedagògica - ${nom} (${municipi})`} />
            </Helmet>
            {!embed &&
              <Button className="torna" aria-label="Torna" onClick={tancaFitxa} >
                <ArrowBack className="left-icon" />
                Torna
            </Button>
            }
            <section className="seccio centre">
              <Paper className="paper">
                <div className="logo-nom-seccio">
                  {logo && <img className="seccio-logo" src={`${/^http.?:\/\//.test(logo) ? '' : LOGO_BASE}${logo}`} alt={nom} />}
                  <div className="nom-seccio">
                    <Typography variant="h4">{nom}</Typography>
                    <div id="tipus">Centre {pb ? 'públic' : 'privat concertat'}</div>
                  </div>
                </div>
                <div className="adreca">
                  <p>
                    {adreca}<br />
                    {`${municipi} (${comarca})`}<br />
                    {tel && <>{`Tel. ${tel}`}</>}
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
                  {twitter &&
                    <Button
                      variant="contained"
                      className="info-btn"
                      href={`https://twitter.com/${twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={twitter}
                    >
                      <TwitterIcon className="left-icon" />
                      Twitter
                    </Button>
                  }
                  {mail &&
                    <Button
                      variant="contained"
                      className="info-btn"
                      href={`mailto:${mail}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={mail}
                    >
                      <MailIcon className="left-icon" />
                      Contacte
                    </Button>
                  }
                </div>
                <Typography variant="h6">Estudis</Typography>
                <ul>
                  {estudis.map((e, n) => <li key={n}>{data.estudis.get(e)}</li>)}
                </ul>
                <Typography variant="h6">Zones</Typography>
                <ul>
                  {servei_territorial && <li><Link to={`${homepage}/zona/${sstt}`}>{servei_territorial.nom}</Link></li>}
                  {servei_educatiu && <li><Link to={`${homepage}/zona/${se}`}>{servei_educatiu.nom}</Link></li>}
                </ul>
                <br />
                <Typography variant="h6">Programes on participa</Typography>
                <List >
                  {plainArray(programes).map(({ id, nom, simbol, cursos }, n) => {
                    const link = (info && hasExtraInfo(info[id])) ? null : `${homepage}/${HASH}programa/${id}`;
                    return (
                      <ListItem key={n} button className="no-padding-h-small" component={link ? 'a' : 'div'} href={link}>
                        <ListItemAvatar>
                          <Avatar src={`${homepage}/logos/mini/${simbol}`} alt={nom} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={nom}
                          secondary={(info && info[id] && getInfoSpan(info[id], id, codi)) || `${cursos.length === 1 ? 'Curs' : 'Cursos'} ${cursos.sort().map(c => {
                            const nc = notCert.has(`${id}|${c}`);
                            hasNc = hasNc || nc;
                            return `${c}${nc ? ' *' : ''}`;
                          }).join(', ')}`}
                        />
                      </ListItem>
                    );
                  })}
                </List>
                {hasNc &&
                  <>
                    <br />
                    <Typography color="secondary">*: Participació en curs, pendent de certificar</Typography>
                  </>
                }
                <br />
                <Button
                  variant="contained"
                  className="csv-btn"
                  title='Descarrega la llista de programes en format CSV'
                  onClick={() => exportData(centre)}
                >
                  <DownloadIcon className="left-icon" />
                  CSV
                </Button>
              </Paper>
            </section>
            <MapSection {...{ data, programa: null, centre: codi, zona: null, currentPrograms, polygons, mapChanged, updateMap }} />
          </>
        );
      }}
    </AppContext.Consumer>
  );
}

export default FitxaCentre;
