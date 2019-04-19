import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Switch from '@material-ui/core/Switch';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SelectPrograms from './SelectPrograms';


function Programes({ data: { programes, ambitsCurr, ambitsInn, nivells }, ambitCurr, ambitInn, nivell, currentPrograms, updateMainState }) {

  const [expanded, setExpanded] = React.useState(true);

  // Click on program name
  const handleProgClick = id => ev => updateMainState({ programa: id }, true, true);

  // Select / Unselect program
  const handleProgSelect = id => ev => {
    currentPrograms[currentPrograms.has(id) ? 'delete' : 'add'](id);
    updateMainState({ currentPrograms, ambitCurr: '', ambitInn: '', nivell: '' }, true, true);
  };

  return (
    <section className="seccio programes">
      <Paper className="paper">
        <ExpansionPanel expanded={expanded} onChange={(_ev, isExpanded) => setExpanded(isExpanded)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Selecció de programes</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <SelectPrograms  {...{ data: { programes, ambitsCurr, ambitsInn, nivells }, ambitCurr, ambitInn, nivell, currentPrograms, updateMainState }} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
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
