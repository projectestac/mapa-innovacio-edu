import React from 'react';
import { withRouter } from 'react-router-dom';
import AppContext from '../AppContext';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import SearchBar from './SearchBar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

function Header({ history, location }) {

  const [drawerOpened, setDrawerOpened] = React.useState(false);
  const [searchOpened, setSearchOpened] = React.useState(false);

  return (
    <AppContext.Consumer>
      {({ menuItems, searchFn }) => {

        const hasDrawer = menuItems && menuItems.length > 0;

        const itemAction = (item) => () => {
          setDrawerOpened(false);
          if (item.path)
            history.push(item.path);
        }

        menuItems.forEach(mi => mi.current = mi.path === location.pathname);

        return (
          <>
            <AppBar
              className="header"
              position="fixed"
            >
              <ToolBar
                disableGutters={true}
              >
                {hasDrawer &&
                  <IconButton
                    className="main-menu-button"
                    color="inherit"
                    aria-label="Seccions"
                    title="Seccions"
                    onClick={() => setDrawerOpened(true)}
                  >
                    <MenuIcon />
                  </IconButton>
                }
                <div className="main-header-block">
                  <div className="top-bar">
                    <a className="logo-gencat" href="https://web.gencat.cat/" title="Generalitat de Catalunya" target="_top">gencat.cat</a>
                    <SearchBar {...{ className: 'search-bar', history, mini: true }} />
                  </div>
                  <Typography className="main-title" variant="h6" color="inherit" noWrap>
                    Mapa de la Innovació Educativa
                </Typography>
                  <ul className="nav-bar">
                    {menuItems.map(item => (
                      <li key={item.id}>
                        <div className="nav-label" role="button" current={item.current ? 'true' : 'false'} onClick={itemAction(item)}>{item.name}</div>
                      </li>
                    ))}
                  </ul>
                </div>
                <IconButton
                  className="search-btn-small"
                  color="inherit"
                  aria-label="Cerca"
                  title="Cerca"
                  onClick={() => setSearchOpened(!searchOpened)}
                >
                  <SearchIcon />
                </IconButton>
              </ToolBar>
              {searchOpened && <SearchBar {...{ closeFn: () => setSearchOpened(false), history }} />}
            </AppBar>
            {
              hasDrawer &&
              <Drawer
                variant="persistent"
                anchor="left"
                open={drawerOpened}
              >
                <List>
                  <ListItem component="li" divider button onClick={() => setDrawerOpened(false)}>
                    <ListItemIcon>
                      <ChevronLeftIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tanca el menú" />
                  </ListItem>
                  {menuItems.map(item => (
                    <ListItem component="li" button key={item.id} onClick={itemAction(item)}>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            }
          </>
        );
      }}
    </AppContext.Consumer>
  );
}

export default withRouter(Header);
