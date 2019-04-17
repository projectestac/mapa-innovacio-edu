import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

function Programes({ id, data: { programes, centres }, currentPrograms, updateMainState, programa }) {

  // Click on program name
  const handleProgClick = id => ev => updateMainState({ programa: id }, true, true);

  // Select / Unselect program
  const handleProgSelect = id => ev => {
    const prog = currentPrograms.indexOf(id);
    if (prog >= 0)
      currentPrograms.splice(prog, 1);
    else
      currentPrograms.push(id);

    updateMainState({ currentPrograms }, true, true);
  };

  return (
    <section className="seccio programes">
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