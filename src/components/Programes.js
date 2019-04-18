import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import Avatar from '@material-ui/core/Avatar';

function Programes({ data: { programes, ambitsCurr, ambitsInn, nivells }, ambitCurr, ambitInn, nivell, currentPrograms, updateMainState }) {

  // Click on program name
  const handleProgClick = id => ev => updateMainState({ programa: id }, true, true);

  const capAmbit = { ambitCurr: null, ambitInn: null, nivell: null };

  // Select / Unselect program
  const handleProgSelect = id => ev => {
    currentPrograms[currentPrograms.has(id) ? 'delete' : 'add'](id);
    updateMainState({ currentPrograms, ...capAmbit }, true, true);
  };

  const allSelected = currentPrograms.size === programes.size;

  const handleSelectAll = ev => {
    if (ev.target.checked)
      programes.forEach((_p, id) => currentPrograms.add(id));
    else
      currentPrograms.clear();
    updateMainState({ currentPrograms, ...capAmbit }, true, true);
  };

  const handleAmbitCurr = ev => {
    const ambit = ev.target.value;
    currentPrograms.clear();
    if (ambit) {
      programes.forEach((p, id) => {
        if (p.ambCurr.includes(ambit))
          currentPrograms.add(id);
      });
    }
    updateMainState({ currentPrograms, ...capAmbit, ambitCurr: ambit }, true, true);
  }

  const handleAmbitInn = ev => {
    const ambit = ev.target.value;
    currentPrograms.clear();
    if (ambit) {
      programes.forEach((p, id) => {
        if (p.ambInn.includes(ambit))
          currentPrograms.add(id);
      });
    }
    updateMainState({ currentPrograms, ...capAmbit, ambitInn: ambit }, true, true);
  }

  const handleNivell = ev => {
    const nivell = ev.target.value;
    currentPrograms.clear();
    if (nivell) {
      programes.forEach((p, id) => {
        if (p.tipus.includes(nivell))
          currentPrograms.add(id);
      });
    }
    updateMainState({ currentPrograms, ...capAmbit, nivell }, true, true);
  }

  return (
    <section className="seccio programes">
      <Paper className="paper">
        <h2>Programes</h2>
        <div id="select">

          <FormControl className="select-list">
            <InputLabel htmlFor="select-nivell">Nivell educatiu</InputLabel>
            <Select
              value={nivell}
              onChange={handleNivell}
              inputProps={{
                name: 'Nivell educatiu',
                id: 'select-nivell'
              }}
            >
              <option value="" />
              {Array.from(nivells).map(n => (
                <option value={n}>{n}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl className="select-list">
            <InputLabel htmlFor="select-ambit-curr">Àmbit curricular</InputLabel>
            <Select
              value={ambitCurr}
              onChange={handleAmbitCurr}
              inputProps={{
                name: 'Àmbit curricular',
                id: 'select-ambit-curr'
              }}
            >
              <option value="" />
              {Array.from(ambitsCurr).map(ambit => (
                <option value={ambit}>{ambit}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl className="select-list">
            <InputLabel htmlFor="select-ambit-inn">Àmbit d'innovació</InputLabel>
            <Select
              value={ambitInn}
              onChange={handleAmbitInn}
              inputProps={{
                name: 'Àmbit d\'innovació',
                id: 'select-ambit-inn'
              }}
            >
              <option value="" />
              {Array.from(ambitsInn).map(ambit => (
                <option value={ambit}>{ambit}</option>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            id="select-all"
            control={
              <Checkbox
                onChange={handleSelectAll}
                checked={allSelected}
              />}
            label="Selecciona'ls tots"
            labelPlacement="start"
          />
        </div>
        <List dense className="prog_list">
          {Array.from(programes.values()).map(({ id, nom, simbol, centres }, n) => (
            <ListItem key={n} button>
              <ListItemAvatar>
                <Avatar src={`logos/${simbol}`} alt={nom} />
              </ListItemAvatar>
              <ListItemText
                primary={nom}
                secondary={'Centres participants: ' + Object.keys(centres).sort().map(k => `${k}: ${centres[k].length}`).join(', ')}
                onClick={handleProgClick(id)} />
              <ListItemSecondaryAction>
                <Switch onChange={handleProgSelect(id)} checked={currentPrograms.has(id)} />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </section>
  );
}

export default Programes;