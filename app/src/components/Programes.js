import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

function Programes({ id, data: { programes }, currentPrograms, updateGlobalState, programa }) {

  // Click on program name
  const handleProgClick = id => ev => updateGlobalState({ programa: id });

  // Select / Unselect program
  const handleProgSelect = id => ev => {
    const cp = currentPrograms.map(p => p);
    const p = cp.indexOf(id);
    if (p >= 0)
      cp.splice(p, 1);
    else
      cp.push(id);
    updateGlobalState({ currentPrograms: cp });
  };

  return (
    <section id={id} className="seccio programes">
      <Paper className="paper">
        <h2>Programes</h2>
        <List dense className="prog_list">
          {programes.map(({ id, nom, simbol, centres }, n) => (
            <ListItem key={n} button>
              <ListItemAvatar>
                <Avatar src={`logos/${simbol}`} alt={nom} />
              </ListItemAvatar>
              <ListItemText
                primary={nom}
                secondary={'Centres participants: ' + Object.keys(centres).sort().map(k => `${k}: ${centres[k].length}`).join(', ')}
                onClick={handleProgClick(id)} />
              <ListItemSecondaryAction>
                <Checkbox onChange={handleProgSelect(id)} checked={currentPrograms.includes(id)} />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </section>
  );
}

export default Programes;