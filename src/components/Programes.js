import React from 'react';
import AppContext from '../AppContext';
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
import Utils from '../utils/Utils';

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
                          secondary={'Centres ' + Object.keys(centres).sort().map(k => `${Utils.cursCurt(k)}: ${centres[k].length}`).join(', ')}
                          onClick={handleProgClick(id)} />
                        <ListItemSecondaryAction>
                          <Switch onChange={handleProgSelect(id)} checked={currentPrograms.has(id)} />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
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
