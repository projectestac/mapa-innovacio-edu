import React from 'react';
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

/**
 * Builds the app header, including a dynamic drawer containing links to all products
 * of the current order, passed via `menuItems` property.
 */
class Header extends React.Component {
  state = {
    drawerOpened: false,
    searchOpened: false,
  };

  openDrawer = (state) => () => this.setState({ drawerOpened: state });

  openSearch = (state) => () => this.setState({ searchOpened: state });

  handleClickOnItem = (id) => {
    const target = document.getElementById(id);
    if (!target)
      console.error(`No hi ha cap secció amb aquest identificador: ${id}`);
    else {
      target.scrollIntoView({ behavior: 'smooth' });
      this.setState({ drawerOpened: false });
    }
  };

  render() {
    const { drawerOpened, searchOpened } = this.state;

    const { menuItems } = this.props;
    const hasDrawer = menuItems && menuItems.length > 0;

    return (
      <>
        <AppBar position='fixed'>
          <ToolBar>
            {hasDrawer &&
              <IconButton
                color='inherit'
                aria-label='Seccions'
                title='Seccions'
                onClick={this.openDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            }
            <Typography className='main-title' variant='h6' color='inherit' noWrap>
              Mapa de la Innovació Educativa (en construcció!)
            </Typography>
            <IconButton
              color='inherit'
              aria-label='Cerca'
              title='Cerca'
              onClick={this.openSearch(!searchOpened)}
            >
              <SearchIcon />
            </IconButton>

          </ToolBar>

          {searchOpened && <SearchBar {...{ closeFn: this.openSearch(false) }} />}

        </AppBar>



        {hasDrawer &&
          <Drawer
            variant='persistent'
            anchor='left'
            open={drawerOpened}
          >
            <List>
              <ListItem component='li' divider button onClick={this.openDrawer(false)}>
                <ListItemIcon>
                  <ChevronLeftIcon />
                </ListItemIcon>
                <ListItemText primary='Tanca el menú' />
              </ListItem>
              {menuItems.map(item => (
                <ListItem component='li' button key={item.id} onClick={() => this.handleClickOnItem(item.id)}>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        }
      </>
    );
  }
}

export default Header;
