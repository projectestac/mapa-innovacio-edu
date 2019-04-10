import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

function SearchBar({ closeFn }) {

  const [searchText, setSearchText] = React.useState('');

  return (
    <div className="search-bar">
      <SearchIcon />
      <TextField
        label="Cerca"
        className="search-text"
        value={searchText}
        onChange={ev => setSearchText(ev.target.value)}
      />
      <IconButton
        className="search-close"
        color='inherit'
        aria-label='Tanca'
        title='Tanca'
        onClick={closeFn}
      >
        <CloseIcon />
      </IconButton>

    </div>
  );
}

export default SearchBar;
