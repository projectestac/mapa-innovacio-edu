import React from 'react';
import { AppContext } from '../App';
import MapSection from './MapSection';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Switch from '@material-ui/core/Switch';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import SelectProgramsDlg from './SelectProgramsDlg';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import { cursCurt, csvExportToFile } from '../utils/Utils';

/**
 * Export the list of schools to a CSV spreadsheet
 */
function exportData(programesArray, cursos) {

  const fields = [
    { name: 'CODI', id: 'codi' },
    { name: 'CENTRE', id: 'centre' },
    { name: 'SSTT', id: 'sstt' },
    { name: 'CURS', id: 'curs' },
    { name: 'PROGRAMA', id: 'programa' },
    { name: 'TITOL', id: 'titol' },
    { name: 'INFO', id: 'url' },
  ];

  const base = `${window.location.origin}${window.location.pathname}#`;

  const data = programesArray.reduce((total, programa) => {
    const { centres, info } = programa;
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
            programa: programa.nom,
            titol: inf ? inf.titol : '',
            url: inf ? `${base}/projecte/${programa.id}|${centre.id}|${inf.num || 0}` : '',
          });
        });
        return result;
      }, total);
  }, []);

  return csvExportToFile(
    `programes.csv`,
    data,
    fields,
  );
}

function Programes({ history }) {

  return (
    <AppContext.Consumer>
      {({ data, data: { programes, ambitsCurr, ambitsInn, nivells }, cursos, currentPrograms, polygons, mapChanged, updateMap, tabMode, currentTab, dlgOpen }) => {
        const allSelected = currentPrograms.size === programes.size;

        // Click on program name
        const handleProgClick = id => () => history.push(`/programa/${id}`);

        // Select / Unselect program
        const handleProgSelect = id => ev => {
          currentPrograms[currentPrograms.has(id) ? 'delete' : 'add'](id);
          updateMap({ currentPrograms, ambitCurr: '', ambitInn: '', nivell: '' }, true, true);
        };

        // Select / unselect all programs
        const handleSelectAll = ev => {
          if (ev.target.checked)
            programes.forEach((_p, id) => currentPrograms.add(id));
          else
            currentPrograms.clear();
          updateMap({ currentPrograms }, true, true);
        };

        const tabSelected = (_ev, value) => updateMap({ currentTab: value });

        return (
          <>
            <SelectProgramsDlg {...{ dlgOpen, data: { programes, ambitsCurr, ambitsInn, nivells }, updateMap }} />
            {tabMode &&
              <Tabs
                className="prog-tabs"
                value={currentTab}
                onChange={tabSelected}
                variant="fullWidth"
              >
                <Tab label="Mapa" />
                <Tab label="Programes" />
              </Tabs>
            }
            {(!tabMode || currentTab === 1) &&
              <section className={`seccio programes`}>
                <Paper className="paper">
                  <div className="select-progs">
                    <Button variant="outlined" color="primary" onClick={() => updateMap({ dlgOpen: true })}>Selecciona per tipus</Button>
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
                    {Array.from(programes.values()).map(({ id, nom, simbol, centres }, n) => (
                      <ListItem key={n} button className="list-button">
                        <ListItemAvatar>
                          <Avatar src={`logos/mini/${simbol}`} alt={nom} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={nom}
                          secondary={'Centres ' + Object.keys(centres).sort().map(k => `${cursCurt(k)}: ${centres[k].length}`).join(', ')}
                          onClick={handleProgClick(id)} />
                        <ListItemSecondaryAction>
                          <Switch onChange={handleProgSelect(id)} checked={currentPrograms.has(id)} />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                  <br />
                  <Button
                    variant="contained"
                    className="csv-btn"
                    title='Relació de centres participants als programes i cursos seleccionats'
                    onClick={() => exportData(Array.from(programes.values()).filter(p => currentPrograms.has(p.id)), cursos)}
                  >
                    <DownloadIcon className="left-icon" />
                    CSV
                  </Button>
                </Paper>
              </section>
            }
            {(!tabMode || currentTab === 0) &&
              <MapSection {...{ data, programa: null, centre: null, zona: null, cursos, currentPrograms, polygons, mapChanged, updateMap }} />
            }
          </>
        );
      }}
    </AppContext.Consumer>
  );
}

export default Programes;
