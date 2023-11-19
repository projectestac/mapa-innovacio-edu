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
import DownloadIcon from 'mdi-material-ui/FileDownload';
import { getOptimalSrc, plainArray, getInfoSpan, hasExtraInfo, csvExportToFile, muniComarca, jumpTo } from '../utils/Utils';
import Error from './Error';
import MapSection from './MapSection';


function FitxaCentre({ history, match: { params: { codi } } }) {

  return (
    <AppContext.Consumer>
      {({ data, data: { centres, poligons, estudis }, polygons, mapChanged, updateMap, updateXarxesMap,
        settings: { HASH, HOMEPAGE, LOGO_BASE, APP_BASE, EMBED, PRJLOGOS_PATH } }) => {

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

          const nomCentre = `${centre.nom} (${centre.municipi})`;

          const csvData = Object.keys(programes).reduce((result, curs) => {
            programes[curs].forEach(prog => {
              const inf = info && info[prog.id] && info[prog.id].find(i => i.curs === curs);
              result.push({
                centre: nomCentre,
                codi: centre.id,
                curs,
                programa: prog.nom,
                url: inf ? `${APP_BASE}projecte/${prog.id}|${centre.id}|${inf.num || 0}` : `${APP_BASE}programa/${prog.id}`,
                titol: inf ? inf.titol : '',
              });
            });
            return result;
          }, []);

          return csvExportToFile(
            `programes-${centre.id}.csv`,
            csvData,
            fields,
          );
        }

        // Find the specified program
        const centre = centres.get(codi);
        if (!centre)
          return <Error {...{ error: `Aquest codi no correspon a cap centre dels que participen en algun programa d'innovació: ${codi}`, history }} />

        const { nom, municipi, comarca, estudis: estudisCentre, cp, adreca, web, logo, tel, mail, twitter, sstt, se, pb, programes, info, notCert } = centre;
        const tancaFitxa = () => history.goBack();
        const servei_territorial = poligons.get(sstt);
        const servei_educatiu = poligons.get(se);
        const hasNc = notCert.size > 0;

        return (
          <>
            <Helmet>
              <title>{`${nom} - Mapa de la innovació pedagògica de Catalunya`}</title>
              <meta name="description" content={`Programes, projectes i pràctiques d'innovació pedagògica - ${nom} (${municipi})`} />
            </Helmet>
            {!EMBED &&
              <Button className="torna" aria-label="Torna" onClick={tancaFitxa} >
                <ArrowBack className="left-icon" />
                Torna
            </Button>
            }
            <section className="seccio centre">
              <Paper className="paper">
                <div className="logo-nom-seccio">
                  {logo && <img className="seccio-logo" src={getOptimalSrc(`${/^http.?:\/\//.test(logo) ? '' : LOGO_BASE}${logo}`)} alt={nom} />}
                  <div className="nom-seccio">
                    <Typography variant="h4">{nom}</Typography>
                    <div id="tipus">Centre {pb ? 'públic' : 'privat concertat'}</div>
                  </div>
                </div>
                <div className="adreca">
                  <p>
                    {adreca}<br />
                    {`${cp} ${muniComarca(municipi, comarca)}`}<br />
                    {tel && <>Tel.: <a href={`tel:+34 ${tel}`} rel="nofollow">{tel}</a></>}
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
                  {estudisCentre.map((e, n) => <li key={n}>{estudis.get(e)}</li>)}
                </ul>
                <Typography variant="h6">Zones</Typography>
                <ul>
                  {servei_territorial && <li><Link to={`/zona/${sstt}`}>{servei_territorial.nom}</Link></li>}
                  {servei_educatiu && <li><Link to={`/zona/${se}`}>{servei_educatiu.nom}</Link></li>}
                </ul>
                <br />
                <Typography variant="h6">Iniciatives d'innovació pedagògica on participa</Typography>
                <List >
                  {plainArray(programes).map(({ id, nom, simbol, cursos }, n) => {
                    const link = `/${HASH}programa/${id}`;
                    const withInfo = info && hasExtraInfo(info[id]);
                    return (
                      <ListItem key={n} button className="no-padding-h-small"
                        component={withInfo ? 'div' : 'a'}
                        href={`${HOMEPAGE}${link}`}
                        onClick={withInfo ? jumpTo(link, history) : null}>
                        <ListItemAvatar>
                          <Avatar src={getOptimalSrc(`${PRJLOGOS_PATH}mini/${simbol}`)} alt={nom} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={nom}
                          secondary={(info && info[id] && getInfoSpan(info[id], id, codi)) || `${cursos.length === 1 ? 'Curs' : 'Cursos'} ${cursos.sort().map(c => {
                            const nc = notCert.has(`${id}|${c}`);
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
                    <Typography color="secondary">*: Participació en curs</Typography>
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
            <MapSection {...{ data, programa: null, centre: codi, zona: null, currentElements: [], polygons, mapChanged, updateMap, updateXarxesMap }} />
          </>
        );
      }}
    </AppContext.Consumer>
  );
}

export default FitxaCentre;
