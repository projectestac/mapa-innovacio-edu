import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
//import color_primary from '@material-ui/core/colors/teal';  // was indigo (teal)
import color_secondary from '@material-ui/core/colors/red';  // was pink (green)
import color_error from '@material-ui/core/colors/red';

import Utils from './utils/Utils';
import Header from './components/Header';
import Presentacio from './components/Presentacio';
import Programes from './components/Programes';
import FitxaPrograma from './components/FitxaPrograma';
import FitxaCentre from './components/FitxaCentre';
import MapSection from './components/MapSection';
import Error from './components/Error';
import Loading from './components/Loading';
import Footer from './components/Footer';

const color_primary = { 500: '#333' };

/**
 * Miscellanous values taken from environment variables
 * and from files: `.env`, `.env.development` and `.env.production`
 */
//const API_ROOT = process.env.REACT_APP_API_ROOT || '../api';

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

  constructor() {
    super();

    // Container for immutable data
    this.data = {
      programes: [],
      instancies: [],
      centres: [],
      centresByK: {},
      poligons: [],
    }

    // Set initial state
    this.state = {
      dataLoaded: false,
      currentPolygons: [],
      currentPrograms: [],
      program: null,
      centre: null,
      polygonMode: 'ST',
      loading: true,
      error: false,
    };
  }

  /**
   * Load datasets from API or JSON files
   */
  loadData() {

    console.log('Loading data!');

    this.setState({ loading: true });
    return Promise.all(
      [
        'data/programes.json', // `${API_ROOT}/programes/`
        'data/instancies.json', // `${API_ROOT}/instancies/`
        'data/centres.json',
        'data/poligons.json',
      ].map(uri => {
        return fetch(uri, { method: 'GET', credentials: 'same-origin' })
          .then(Utils.handleFetchErrors)
          .then(response => response.json());
      })
    )
      .then(([programes, instancies, centres, poligons]) => {

        // Build an object with centre ids as keys, useful for optimizing searches
        const centresByK = {};
        centres.forEach(c => {
          c.programes = [];
          centresByK[c.id] = c;
        });

        // Convert synthetic multi-point expressions into arrays of co-ordinates suitable for leaflet polygons
        poligons.forEach(p => {
          p.poligons = p.poligons.map(pts => pts.split(',').map(pt => pt.split('|').map(vs => Number(vs))));
        });

        const currentPrograms = [];

        // Guess missing fields in `programes`
        // (to be supressed!)
        programes.forEach(p => {

          // Set all programs initially selected
          currentPrograms.push(p.id);

          // Initialize `centres` (to be filled later)
          p.centres = {};

          // Empty `tipus`? then try to guess them from title and description
          if (p.tipus.length === 0) {
            const str = `${p.nom} ${p.nomCurt} ${p.descripcio}`;
            if (/(FP|fp|[pP]rofessio)/.test(str))
              p.tipus = ['CFPM', 'CFPS'];
            else if (/(infantil|primària|escola)/.test(str))
              p.tipus = ['EINF2C', 'EPRI'];
            else
              p.tipus = ['EINF2C', 'EPRI', 'ESO'];
          }
        });

        instancies.forEach(ins => {
          // Initialize arrays of `centres` for each program, and `programa` for each centre, by curs
          const programa = programes.find(p => p.id === ins.programa);
          const centre = centresByK[ins.centre];
          if (programa && centre) {
            (programa.centres[ins.curs] = programa.centres[ins.curs] || []).push(centre);
            (centre.programes[ins.curs] = centre.programes[ins.curs] || []).push(programa);
          }
          else
            console.log(`WARNING: Instància amb programa o centre desconegut: ${ins.programa} - ${ins.centre} - ${ins.curs}`);
        });

        // Get current polygon mode
        const { polygonMode } = this.state;

        // Update main data object
        this.data = {
          programes,
          instancies,
          centres,
          centresByK,
          poligons,
        };

        // Update state
        this.setState({
          dataLoaded: true,
          currentPolygons: poligons.filter(p => p.tipus === polygonMode),
          currentPrograms,
          loading: false,
          error: false,
        });
      })
      .catch(error => {
        // Something wrong happened!
        console.log(error);
        this.setState({ error });
      });
  }

  /**
   * Set the polygon mode.
   * @param {string} mode - Possible values are 'ST', 'SEZ' and 'NONE' 
   */
  setPolygonMode(mode) {
    const polygons = mode === 'NONE' ? [] : this.data.poligons.filter(p => p.tipus === mode);
    this.setState({
      currentPolygons: polygons,
      polygonMode: mode,
    });
  }

  /**
   * Miscellaneous operations to be performed at startup
   */
  componentDidMount() {
    // Load Google's "Roboto" font
    Utils.loadGFont('Roboto');
    // Load datasets
    this.loadData();
  }


  /**
   * Builds the App main component
   */
  render() {

    // Retrieve values from state
    const data = this.data;
    const { error, loading, currentPolygons, currentPrograms, programa, centre } = this.state;

    const updateGlobalState = (state) => {

      const scrollToId = state.centre ? 'centre' : state.programa ? 'programa' : this.state.programa ? 'programes' : null;

      this.setState(state);

      if (scrollToId) {
        window.requestAnimationFrame(() => {
          const target = document.getElementById(scrollToId);
          if (target)
            target.scrollIntoView({ behavior: 'smooth' });
        });
      }
    };

    // Current app sections
    const seccions = [
      { id: 'presenta', name: 'Presentació' },
      centre ? { id: 'centre', name: 'Centre' } : programa ? { id: 'programa', name: 'Programa' } : { id: 'programes', name: 'Programes' },
    ];
    if (!centre)
      seccions.push({ id: 'mapa', name: 'Mapa' })

    return (
      <CssBaseline>
        <MuiThemeProvider theme={theme}>
          <Header menuItems={seccions} />
          {
            (error && <Error error={error} refetch={this.loadData} />) ||
            (loading && <Loading />) ||
            <main>
              <Presentacio id="presenta" />
              {
                (centre && <FitxaCentre {...{ id: 'centre', centre, data, updateGlobalState }} />) ||
                (programa && <FitxaPrograma {...{ id: 'programa', programa, data, updateGlobalState }} />) ||
                <Programes {...{ id: 'programes', data, currentPrograms, updateGlobalState }} />
              }
              {!centre && <MapSection {...{ id: 'mapa', data, currentPrograms, currentPolygons, programa, updateGlobalState }} />}
              <Footer />
            </main>
          }
        </MuiThemeProvider>
      </CssBaseline>
    );
  }
}

export default App;
