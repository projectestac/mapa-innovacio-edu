import React from 'react';
import AppContext from '../AppContext';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TablePagination from "@material-ui/core/TablePagination";
import ProgramIcon from '@material-ui/icons/Group';
import SchoolIcon from 'mdi-material-ui/MapMarker';

const DEFAULT_ITEMS_PER_PAGE = Number(process.env.REACT_APP_ITEMS_PER_PAGE || 25);

function Cerca({ history, match: { params: { query } } }) {

  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(DEFAULT_ITEMS_PER_PAGE);
  const [queryResults, setQueryResults] = React.useState([]);
  const [currentQuery, setCurrentQuery] = React.useState('');

  return (
    <AppContext.Consumer>
      {({ fuseFuncs }) => {

        if (query !== currentQuery) {
          // Perform full text search using Fuse.js
          // See `loadData` in App.js for details about how these functions are built
          setCurrentQuery(query);
          setQueryResults(fuseFuncs.reduce((qr, ff) => qr.concat(ff.search(query)), []));
        }

        const goToElement = (tipus, id) => ev => {
          history.push(`/${tipus}/${id}`);
        };

        return (
          <>
            <Button
              className="torna"
              aria-label="Torna"
              onClick={() => history.goBack()} >
              <ArrowBack className="left-icon" />
              Torna
            </Button>
            <section className="seccio cerca">
              <Paper className="paper">
                <h2>Resultats de la cerca "{currentQuery}"</h2>
                {(queryResults.length === 0 && <p>No s'ha trobat cap element coïncident amb el criteri de cerca!</p>) ||
                  <div>
                    <List component="ul">
                      {queryResults.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map(({ item: { nom, id, tipus, simbol } }, n) => (
                        <ListItem
                          key={n}
                          button
                          onClick={goToElement(tipus, id)}
                        >
                          <ListItemIcon>
                            {simbol ? <Avatar src={`logos/mini/${simbol}`} alt={nom} /> : tipus === 'programa' ? <ProgramIcon /> : <SchoolIcon />}
                          </ListItemIcon>
                          <ListItemText primary={nom} />
                        </ListItem>
                      ))}
                    </List>
                    <hr />
                    <TablePagination
                      classes={{ spacer: 'hidden', toolbar: 'no-padding' }}
                      component="nav"
                      page={page}
                      rowsPerPage={itemsPerPage}
                      onChangeRowsPerPage={ev => setItemsPerPage(ev.target.value)}
                      count={queryResults.length}
                      onChangePage={(ev, p) => setPage(p)}
                      labelDisplayedRows={({ from, to, count }) => `Resultats ${from} al ${to} de ${count}`}
                      labelRowsPerPage="Resultats per pàgina:"
                    />
                  </div>
                }
              </Paper>
            </section>
          </>
        );
      }}
    </AppContext.Consumer>
  );
}

export default Cerca;