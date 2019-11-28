/*!
 *  File    : components/Header.js
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
import { withRouter } from 'react-router-dom';
import { AppContext } from '../App';
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
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';


function Header(props) {

  const { history, location } = props;
  const [drawerOpened, setDrawerOpened] = React.useState(false);
  const [searchOpened, setSearchOpened] = React.useState(false);

  function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined, threshold: 50 });

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

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
            <HideOnScroll {...props}>
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
                      Mapa de la innovació pedagògica
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
            </HideOnScroll>
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
