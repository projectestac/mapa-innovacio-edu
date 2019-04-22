import React from 'react';
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

function Programes({ data: { programes, ambitsCurr, ambitsInn, nivells }, currentPrograms, updateMainState }) {

  const allSelected = currentPrograms.size === programes.size;

  // Click on program name
  const handleProgClick = id => ev => updateMainState({ programa: id }, true, true);

  // Select / Unselect program
  const handleProgSelect = id => ev => {
    currentPrograms[currentPrograms.has(id) ? 'delete' : 'add'](id);
    updateMainState({ currentPrograms, ambitCurr: '', ambitInn: '', nivell: '' }, true, true);
  };

  // Select / unselect all programs
  const handleSelectAll = ev => {
    if (ev.target.checked)
      programes.forEach((_p, id) => currentPrograms.add(id));
    else
      currentPrograms.clear();
    updateMainState({ currentPrograms }, true, true);
  };


  const [dlgOpen, setDlgOpen] = React.useState(false);

  return (
    <section className="seccio programes">
      <SelectProgramsDlg {...{ dlgOpen, setDlgOpen, data: { programes, ambitsCurr, ambitsInn, nivells }, updateMainState }} />
      <Paper className="paper">
        <h3>Programes d'innovació</h3>
        <div className="select-progs">
          <Button variant="outlined" color="primary" onClick={() => setDlgOpen(true)}>Selecciona per tipus</Button>
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
