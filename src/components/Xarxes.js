/*!
 *  File    : components/Xarxes.js
 *  Created : 19/11/2023
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
import { AppContext } from '../App';
import MapSection from './MapSection';
import ReactMarkdown from 'react-markdown';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import MailIcon from '@material-ui/icons/Mail';
import ArrowBack from '@material-ui/icons/ArrowBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Switch from '@material-ui/core/Switch';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import SelectXarxesDlg from './SelectXarxesDlg';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DownloadIcon from 'mdi-material-ui/FileDownload';
import { getOptimalSrc, cursCurt, csvExportToFile } from '../utils/Utils';
import { xarxesDesc } from '../literals';


function Xarxes({ history }) {
  return (
    <AppContext.Consumer>
      {({ data, data: { onlyXarxes: xarxes, ambitsCurr, ambitsInn, nivells },
        cursos, currentXarxes, polygons, mapChanged, updateMap, updateXarxesMap, tabMode, currentTab, dlgXarxesOpen,
        settings: { HOMEPAGE, APP_BASE, EMBED, EMBED_MAP, PRJLOGOS_PATH, MD_OPTIONS } }) => {

        const allSelected = currentXarxes.size === xarxes.size;

        /**
         * Export the list of schools into a CSV spreadsheet
         */
        function exportData(xarxesArray, cursos) {

          const fields = [
            { name: 'CODI', id: 'codi' },
            { name: 'CENTRE', id: 'centre' },
            { name: 'SSTT', id: 'sstt' },
            { name: 'CURS', id: 'curs' },
            { name: 'PROGRAMA', id: 'programa' },
            { name: 'TITOL', id: 'titol' },
            { name: 'INFO', id: 'url' },
          ];

          const csvData = xarxesArray.reduce((total, xarxa) => {
            const { centres, info } = xarxa;
            return Object.keys(centres)
              .filter(curs => cursos.includes(curs))
              .reduce((result, curs) => {
                centres[curs].forEach(centre => {
                  const inf = info && info[centre.id] && info[centre.id].find(i => i.curs === curs);
                  result.push({
                    centre: `${centre.nom} (${centre.municipi})`,
                    codi: centre.id,
                    sstt: centre.sstt,
                    curs,
                    xarxa: xarxa.nom,
                    titol: inf ? inf.titol : '',
                    url: inf ? `${APP_BASE}projecte/${xarxa.id}|${centre.id}|${inf.num || 0}` : '',
                  });
                });
                return result;
              }, total);
          }, []);

          return csvExportToFile(
            `xarxes.csv`,
            csvData,
            fields,
          );
        }

        // Click on program name
        const handleProgClick = id => () => history.push(`/programa/${id}`);

        // Select / Unselect program
        const handleProgSelect = id => ev => {
          currentXarxes[currentXarxes.has(id) ? 'delete' : 'add'](id);
          updateXarxesMap({ currentXarxes, ambitCurr: '', ambitInn: '', nivell: '' }, true, true);
        };

        // Select / unselect all programs
        const handleSelectAll = ev => {
          if (ev.target.checked)
            xarxes.forEach((_p, id) => currentXarxes.add(id));
          else
            currentXarxes.clear();
          updateXarxesMap({ currentXarxes }, true, true);
        };

        const tabSelected = (_ev, value) => updateXarxesMap({ currentTab: value });

        const { nom, descripcio, simbol, link, contacte } = xarxesDesc;

        return (
          <>
            <SelectXarxesDlg {...{ dlgXarxesOpen, data: { xarxes, ambitsCurr, ambitsInn, nivells }, updateXarxesMap }} />
            {!EMBED &&
              <Button className="torna" aria-label="Torna" onClick={() => history.goBack()} >
                <ArrowBack className="left-icon" />
                Torna
              </Button>
            }
            {!EMBED_MAP && tabMode &&
              <Tabs
                className="prog-tabs"
                value={currentTab}
                onChange={tabSelected}
                variant="fullWidth"
              >
                <Tab label="Mapa" />
                <Tab label="Xarxes" />
              </Tabs>
            }
            {(!EMBED_MAP && (!tabMode || currentTab === 1)) &&
              <section className={`seccio programes`}>
                <Paper className="paper">
                  <div className="logo-nom-seccio">
                    <img className="seccio-logo" src={getOptimalSrc(`${PRJLOGOS_PATH}${simbol}`)} alt={nom} />
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
                  </div>
                  <div className="select-progs">
                    {!EMBED && <Button variant="outlined" color="primary" onClick={() => updateXarxesMap({ dlgXarxesOpen: true })}>Selecciona per tipus</Button>}
                    <FormControlLabel
                      className="select-all"
                      labelPlacement="start"
                      control={
                        <Checkbox
                          onChange={handleSelectAll}
                          checked={allSelected}
                        />}
                      label="Selecciona'ls tots"
                    />
                  </div>
                  <List className="prog-list">
                    {Array.from(xarxes.values()).map(({ id, nom, simbol, centres }, n) => (
                      <ListItem key={n} button className="list-button">
                        <ListItemAvatar>
                          <Avatar src={getOptimalSrc(`${PRJLOGOS_PATH}mini/${simbol}`)} alt={nom} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={nom}
                          secondary={'Centres ' + Object.keys(centres).sort().map(k => `${cursCurt(k)}: ${centres[k].length}`).join(', ')}
                          onClick={handleProgClick(id)} />
                        <ListItemSecondaryAction>
                          <Switch onChange={handleProgSelect(id)} checked={currentXarxes.has(id)} />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                  <br />
                  <Button
                    variant="contained"
                    className="csv-btn"
                    title='Relació de centres participants a les xarxes i cursos seleccionats'
                    onClick={() => exportData(Array.from(xarxes.values()).filter(p => currentXarxes.has(p.id)), cursos)}
                  >
                    <DownloadIcon className="left-icon" />
                    CSV
                  </Button>
                </Paper>
              </section>
            }
            {(EMBED_MAP || !tabMode || currentTab === 0) &&
              <MapSection {...{ data, programa: null, centre: null, zona: null, cursos, currentElements: currentXarxes, polygons, mapChanged, updateMap, updateXarxesMap }} />
            }
          </>
        );
      }
      }
    </AppContext.Consumer>
  );
}

export default Xarxes;
