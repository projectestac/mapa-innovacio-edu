/*!
 *  File    : components/Cerca.js
 *  Created : 12/04/2019
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
import { AppContext } from '../App';
import Loading from './Loading';
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
import { homepage } from '../../package.json';

const DEFAULT_ITEMS_PER_PAGE = Number(process.env.REACT_APP_ITEMS_PER_PAGE || 25);

function Cerca({ history, match: { params: { query = '' } } }) {

  // Remove extra spaces
  query = query.trim();

  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(DEFAULT_ITEMS_PER_PAGE);
  const [queryResults, setQueryResults] = React.useState([]);
  const [currentQuery, setCurrentQuery] = React.useState('');
  const [waiting, setWaiting] = React.useState(false);

  return (
    <AppContext.Consumer>
      {({ fuseFuncs }) => {

        if (query !== currentQuery) {
          setCurrentQuery(query);
          setWaiting(true);
          // Pseudo-async function
          window.requestAnimationFrame(() => {
            // Perform full text search using Fuse.js
            // See `loadData` in App.js for details about how these functions are built
            setQueryResults(fuseFuncs.reduce((qr, ff) => qr.concat(ff.search(query)), []));
            setWaiting(false);
          });
        }

        const goToElement = (tipus, id) => ev => {
          history.push(`/${tipus}/${id}`);
        };

        return (
          (waiting && <Loading msg="S'està cercant..." />) ||
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
                      {queryResults.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map(({ nom, id, tipus, simbol }, n) => (
                        <ListItem
                          key={n}
                          button
                          onClick={goToElement(tipus, id)}
                        >
                          <ListItemIcon>
                            {simbol ? <Avatar src={`${homepage}/logos/mini/${simbol}`} alt={nom} /> : tipus === 'programa' ? <ProgramIcon /> : <SchoolIcon />}
                          </ListItemIcon>
                          <ListItemText primary={nom} />
                        </ListItem>
                      ))}
                    </List>
                    <hr />
                    <TablePagination
                      classes={{ spacer: 'hidden', toolbar: 'wrap' }}
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