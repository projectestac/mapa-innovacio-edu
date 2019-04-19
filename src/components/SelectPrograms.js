import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

function SelectPrograms({ data: { programes, ambitsCurr, ambitsInn, nivells }, ambitCurr, ambitInn, nivell, currentPrograms, updateMainState }) {

  const capAmbit = { ambitCurr: '', ambitInn: '', nivell: '' };

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
    <div className="select">
      <div className="select-lists">
        <FormControl className="select-list">
          <InputLabel htmlFor="select-nivell">Nivell educatiu</InputLabel>
          <Select
            value={nivell}
            onChange={handleNivell}
            inputProps={{
              name: 'nivell',
              id: 'select-nivell'
            }}
          >
            <MenuItem value=""><em>Tots els nivells</em></MenuItem>
            {Array.from(nivells).map((n, k) => (
              <MenuItem key={k} value={n}>{n}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="select-list">
          <InputLabel htmlFor="select-ambit-curr">Àmbit curricular</InputLabel>
          <Select
            value={ambitCurr}
            onChange={handleAmbitCurr}
            inputProps={{
              name: 'ambitCurr',
              id: 'select-ambit-curr'
            }}
          >
            <MenuItem value=""><em>Tots</em></MenuItem>
            {Array.from(ambitsCurr).map((ambit, k) => (
              <MenuItem key={k} value={ambit}>{ambit}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="select-list">
          <InputLabel htmlFor="select-ambit-inn">Àmbit d'innovació</InputLabel>
          <Select
            value={ambitInn}
            onChange={handleAmbitInn}
            inputProps={{
              name: 'ambitInn',
              id: 'select-ambit-inn'
            }}
          >
            <MenuItem value=""><em>Tots</em></MenuItem>
            {Array.from(ambitsInn).map((ambit, k) => (
              <MenuItem key={k} value={ambit}>{ambit}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Divider className="divider" />
      <div id="select-all">
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleSelectAll}
              checked={allSelected}
            />}
          label="Selecciona tots els programes"
        />
      </div>
    </div>
  );
}

export default SelectPrograms;
