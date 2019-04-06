import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import FitxaPrograma from './FitxaPrograma';

function Programes({ id, data, currentPrograms, updateGlobalState, programa }) {

  const { programes } = data;

  const [prog, setProg] = React.useState(programa);

  const handleProgClick = id => ev => setProg(id);

  const closeProg = () => setProg(null);

  const handleProgSelect = id => ev => {
    console.log(programes[id])
    const cp = currentPrograms.map(p => p);
    const p = cp.indexOf(id);
    if (p >= 0)
      cp.splice(p, 1);
    else
      cp.push(id);
    updateGlobalState({ currentPrograms: cp });
  };

  return (
    <section id={id} className="seccio projectes">
      <h2>Programes</h2>
      {
        (prog && <FitxaPrograma {...{ data, programa: programes.find(p => p.id === prog), closeProg }} />) ||
        <List dense className="prog_list">
          {programes.map(({ id, nom, simbol, centres }, n) => (
            <ListItem key={n} button>
              <ListItemAvatar>
                <Avatar src={`logos/${simbol}`} alt={nom} />
              </ListItemAvatar>
              <ListItemText
                primary={nom}
                secondary={Object.keys(centres).sort().map(k => `${k}: ${centres[k].length} centres`).join(' | ')}
                onClick={handleProgClick(id)} />
              <ListItemSecondaryAction>
                <Checkbox onChange={handleProgSelect(id)} checked={currentPrograms.includes(id)} />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      }
    </section>
  );
}

export default Programes;