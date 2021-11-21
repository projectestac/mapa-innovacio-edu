/*!
 *  File    : components/SelectProgramsDlg.js
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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function SelectProgramsDlg({ dlgOpen, data: { programes, ambitsCurr, ambitsInn, nivells }, updateMap }) {

  const [ambitInn, setAmbitInn] = React.useState('');
  const [ambitCurr, setAmbitCurr] = React.useState('');
  const [nivellsChk, setNivellsChk] = React.useState(Array.from(nivells).reduce((v, [n]) => { v[n] = true; return v; }, {}));

  // Better to user a react reducer?
  const [currentPrograms, setCurrentPrograms] = React.useState(new Set());

  const updateCurrentPrograms = () => {
    const progs = new Set();
    programes.forEach((prog, id) => {
      if (
        (ambitInn === '' || prog.ambInn.includes(ambitInn)) &&
        (ambitCurr === '' || prog.ambCurr.includes(ambitCurr)) &&
        Object.keys(nivellsChk).find(nivell => nivellsChk[nivell] && nivells.get(nivell).find(tag => prog.tipus.includes(tag)))
      )
        progs.add(id);
    });
    setCurrentPrograms(progs);
    // TODO: Comptar centres!
  };

  React.useMemo(updateCurrentPrograms, [ambitInn, ambitCurr, nivellsChk, nivells, programes]);

  const listSelection = handle => ev => {
    handle(ev.target.value);
  };

  const handleCheckNivell = n => ev => {
    setNivellsChk({ ...nivellsChk, [n]: ev.target.checked });
  };

  const closeDialog = ok => ev => {
    updateMap(Object.assign({ dlgOpen: false }, (ok && { currentPrograms }) || {}), true, ok);
  };

  return (
    <Dialog
      open={dlgOpen}
      TransitionProps={{
        onEnter: updateCurrentPrograms,
      }}
      aria-labelledby="dialog-title"
      classes={{ paper: 'stretch-dlg' }}
    >
      <DialogTitle id="dialog-title">Tipus de programes</DialogTitle>
      <DialogContent className="dialog-content">
        <div className="nivells">
          {Array.from(nivells).map(([nivell]) => (
            <FormControlLabel
              key={nivell}
              className="select-nivell"
              control={
                < Checkbox
                  onChange={handleCheckNivell(nivell)}
                  value={nivell}
                  checked={nivellsChk[nivell]}
                />}
              label={nivell}
            />
          ))}
        </div>
        <FormControl className="select-list">
          <InputLabel htmlFor="select-ambit-curr">Àmbit curricular</InputLabel>
          <Select
            value={ambitCurr}
            onChange={listSelection(setAmbitCurr)}
            inputProps={{
              name: 'ambitCurr',
              id: 'select-ambit-curr'
            }}
          >
            <MenuItem value=""><em>Tots els àmbits</em></MenuItem>
            {Array.from(ambitsCurr.keys()).sort().map(key => (
              <MenuItem key={key} value={key}>{ambitsCurr.get(key)}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="select-list">
          <InputLabel htmlFor="select-ambit-inn">Àmbit d'innovació</InputLabel>
          <Select
            value={ambitInn}
            onChange={listSelection(setAmbitInn)}
            inputProps={{
              name: 'ambitInn',
              id: 'select-ambit-inn'
            }}
          >
            <MenuItem value=""><em>Tots els àmbits</em></MenuItem>
            {Array.from(ambitsInn.keys()).sort().map(key => (
              <MenuItem key={key} value={key}>{ambitsInn.get(key)}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography className="info">
          {currentPrograms.size} {currentPrograms.size === 1 ? 'programa seleccionat' : 'programes seleccionats'}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog(true)} color="primary" >Aplica la selecció</Button>
        <Button onClick={closeDialog(false)} color="primary">Cancel·la</Button>
      </DialogActions>

    </Dialog>
  );

}

export default SelectProgramsDlg;
