import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import color_primary from '@material-ui/core/colors/red';  // was indigo (teal)
import color_secondary from '@material-ui/core/colors/teal';  // was pink (green)
import color_error from '@material-ui/core/colors/red';

import Utils from './utils/Utils';
import Header from './components/Header';
import Presentacio from './components/Presentacio';
import Projectes from './components/Projectes';
import Mapa from './components/Mapa';
import Centre from './components/Centre';

/**
 * Miscellanous values taken from environment variables
 * and from files: `.env`, `.env.development` and `.env.production`
 */
const API_ROOT = process.env.REACT_APP_API_ROOT || '../api';

/**
 * Main Material-UI theme
 */
const theme = createMuiTheme({
  palette: {
    primary: { main: color_primary[500] },
    secondary: { main: color_secondary[500] },
    error: { main: color_error[500] },
  },
  typography: {
    useNextVariants: true,
  },
});

/**
 * Main React component
 */
class App extends Component {

  /**
   * Miscellaneous operations to be performed at startup
   */
  componentDidMount() {
    // Load Google's "Roboto" font
    Utils.loadGFont('Roboto');
  }

  seccions = [
    { id: 'presenta', name: 'Presentació' },
    { id: 'projectes', name: 'Projectes' },
    { id: 'mapa', name: 'Mapa' },
  ];

  render() {
    return (
      <CssBaseline>
        <MuiThemeProvider theme={theme}>
          <Header menuItems={this.seccions} />
          <main>
            <Presentacio id="presenta" />
            <Projectes id="projectes" />
            <Mapa id="mapa" />
            <Centre id="centre" />
          </main>
        </MuiThemeProvider>
      </CssBaseline>
    );
  }
}

export default App;
