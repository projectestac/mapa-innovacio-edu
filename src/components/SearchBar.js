import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

function SearchBar({ closeFn = () => null, searchFn, mini = false }) {

  const [searchText, setSearchText] = React.useState('');
  const search = (ev) => {
    ev.preventDefault();
    searchFn(searchText);
    setSearchText('');
    return closeFn();
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
