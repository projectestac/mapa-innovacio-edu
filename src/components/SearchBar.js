/*!
 *  File    : components/SearchBar.js
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
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

function SearchBar({ closeFn = () => null, history, mini = false }) {

  const [searchText, setSearchText] = React.useState('');
  const search = (ev) => {
    ev.preventDefault();
    closeFn();
    history.push(`/cerca/${searchText}`);
    setSearchText('');
  };

  return (
    <form
      className="search-bar"
      onSubmit={search}>
      <IconButton
        className="search-btn"
        color="inherit"
        aria-label="Cerca"
        title="Cerca"
        onClick={search}
      >
        <SearchIcon />
      </IconButton>
      <TextField
        aria-label="Cerca text..."
        title="Cerca text..."
        className="search-text"
        value={searchText}
        InputProps={{ disableUnderline: true }}
        inputProps={{ 'aria-label': 'Cerca text...' }}
        onChange={ev => setSearchText(ev.target.value)}
      />
      {!mini &&
        <IconButton
          className="search-close"
          color="inherit"
          aria-label="Tanca"
          title="Tanca"
          onClick={closeFn}
        >
          <CloseIcon />
        </IconButton>
      }
    </form>
  );
}

export default SearchBar;
