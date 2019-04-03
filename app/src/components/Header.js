import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Typography from '@material-ui/core/Typography';
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
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleClickOnItem = (id) => {
    const target = document.getElementById(id);
    if (!target)
      console.error(`No hi ha cap secció amb aquest identificador: ${id}`);
    else {
      target.scrollIntoView({ behavior: 'smooth' });
      this.handleDrawerClose();
    }
  };

  render() {
    const { open } = this.state;
    const { menuItems } = this.props;
    const hasDrawer = menuItems && menuItems.length > 0;

    return (
      <header>
        <AppBar position='fixed'>
          <ToolBar disableGutters={!open}>
            {hasDrawer &&
              <IconButton
                color='inherit'
                aria-label='Seccions'
                title='Seccions'
                onClick={this.handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
            }
            <Typography className='main-title' variant='h6' color='inherit' noWrap>
              Mapa de la Innovació Educativa
            </Typography>
          </ToolBar>
        </AppBar>
        {hasDrawer &&
          <Drawer
            variant='persistent'
            anchor='left'
            open={open}
          >
            <List>
              <ListItem component='li' divider button onClick={this.handleDrawerClose}>
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
      </header>
    );
  }
}

export default Header;
