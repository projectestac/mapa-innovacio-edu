import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import color_error from '@material-ui/core/colors/red';
import Fuse from 'fuse.js';

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
import Cerca from './components/Cerca';

// Gencat dark gray
const color_primary = { 500: '#333' };

// Gencat red
const color_secondary = { 500: '#c00000' };

/**
 * Miscellanous values taken from environment variables
 * and from files: `.env`, `.env.development` and `.env.production`
 */
//const API_ROOT = process.env.REACT_APP_API_ROOT || '../api';
const MAX_DENSITY = process.env.REACT_APP_MAX_DENSITY || 0.8;
const MIN_DENSITY = process.env.REACT_APP_MIN_DENSITY || 0.000001;
const MINMAX_DENSITY = process.env.REACT_APP_MINMAX_DENSITY || 0.4;

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
    fontFamily: [
      'Open Sans',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
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
      programes: new Map(),
      centres: new Map(),
      poligons: new Map(),
      ambitsCurr: new Set(),
      ambitsInn: new Set(),
      nivells: new Map([
        // Veure: http://queestudiar.gencat.cat/ca/estudis/
        ['Educació infantil i primària', ['EINF1C', 'EINF2C', 'EPRI']],
        ['Educació secundària obligatòria', ['ESO']],
        ['Batxillerat', ['BATX']],
        ['Formació professional', ['PFI', 'CFPM', 'CFPS', 'RESP']],
        ['Ens. artístics i esportius', ['ART', 'ESDI', 'CFAM', 'CFAS', 'CRBC', 'ADR', 'DANE', 'DANP', 'DANS', 'MUSE', 'MUSP', 'MUSS', 'TEGM', 'TEGS']],
        // TODO: Reassignar aquestes categories:
        ['Altres estudis', ['EE', 'ADULTS', 'ESTR', 'IDI', 'PA01', 'PA02']],
      ]),
    }

    // Set the initial state
    this.state = {
      loading: true,
      dataLoaded: false,
      intro: true,
      error: false,
      polygons: [],
      currentPrograms: new Set(),
      programa: null,
      centre: null,
      modeProgCentre: 'agregat', // Possible values are `perCurs` and `agregat`
      delayedMapUpdate: true,
      query: null,
      queryResults: [],
    };

    // Functions used to perform full-text search with Fuse.js on 'centres' and 'programes', built after loading
    this.fuseFuncs = [];
  }


  /**
   * Load datasets from API or JSON files
   */
  loadData() {
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
      .then(([_programes, _instancies, _centres, _poligons]) => {

        // Sort data (step to be supressed with well ordered JSON sources!)
        _centres = Utils.sortObjectArrayBy(_centres, ['sstt', 'municipi', 'nom']);
        _programes = Utils.sortObjectArrayBy(_programes, 'nom');
        _poligons = Utils.sortObjectArrayBy(_poligons, ['tipus', 'id', 'key']);

        // Build an object with centre ids as keys, useful for optimizing searches
        _centres.forEach(c => {
          c.programes = [];
        });

        // Convert synthetic multi-point expressions into arrays of co-ordinates suitable for leaflet polygons
        _poligons.forEach(p => {
          p.poligons = p.poligons.map(pts => pts.split(',').map(pt => pt.split('|').map(vs => Number(vs))));
        });

        // Prepare sets for auto-detected data
        const currentPrograms = new Set();
        const ambitsCurr = new Set();
        const ambitsInn = new Set();

        // Guess missing fields in `programes`
        // (to be supressed!)
        _programes.forEach(p => {

          p.ambCurr.forEach(a => ambitsCurr.add(a));
          p.ambInn.forEach(a => ambitsInn.add(a));

          // Set all programs initially selected
          currentPrograms.add(p.id);

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

        // Build the Fuse.js objects
        // See: https://fusejs.io/
        const fuseOptions = {
          caseSensitive: false,
          shouldSort: true,
          tokenize: true,
          matchAllTokens: true,
          includeScore: true,
          includeMatches: true,
          threshold: 0.3,
          location: 0,
          distance: 4,
          maxPatternLength: 32,
          minMatchCharLength: 2,
        };

        this.fuseFuncs.push(new Fuse(
          _centres.map(({ id, nom, municipi, comarca }) => { return { id, nom, municipi, comarca, tipus: 'centre' }; }),
          { ...fuseOptions, keys: ['id', 'nom', 'municipi', 'comarca'] })
        );

        this.fuseFuncs.push(new Fuse(
          _programes.map(({ id, nom, descripcio }) => { return { id, nom, descripcio, tipus: 'programa' }; }),
          { ...fuseOptions, keys: ['id', 'nom', 'descripcio'] })
        );

        // Convert arrays to maps
        const centres = new Map(_centres.map(c => [c.id, c]));
        const programes = new Map(_programes.map(p => [p.id, p]));
        const poligons = new Map(_poligons.map(p => [p.key, p]));

        // Initialize arrays of `centres` for each program, and `programa` for each centre, by curs
        _instancies.forEach(ins => {
          const programa = programes.get(ins.programa);
          const centre = centres.get(ins.centre);
          if (programa && centre) {
            (programa.centres[ins.curs] = programa.centres[ins.curs] || []).push(centre);
            (centre.programes[ins.curs] = centre.programes[ins.curs] || []).push(programa);
          }
          else
            console.log(`WARNING: Instància amb programa o centre desconegut: ${ins.programa} - ${ins.centre} - ${ins.curs}`);
        });

        // Update main data object
        this.data = {
          ...this.data,
          programes,
          centres,
          poligons,
          // Sort ambits
          ambitsCurr: new Set(Array.from(ambitsCurr).sort()),
          ambitsInn: new Set(Array.from(ambitsInn).sort()),
        };

        this.updateLayersDensity(currentPrograms);

        // Update the state
        this.setState({
          dataLoaded: true,
          polygons: [
            { name: 'Serveis Territorials', shapes: _poligons.filter(p => p.tipus === 'ST') },
            { name: 'Serveis Educatius de Zona', shapes: _poligons.filter(p => p.tipus === 'SEZ') },
          ],
          currentPrograms,
          loading: false,
          error: false,
        });
      })
      .catch(error => {
        // Something wrong happened!
        console.log(error);
        this.setState({ error: error.toString() });
      });
  }

  /**
   * Miscellaneous operations to be performed at startup
   */
  componentDidMount() {
    // Load Google's "Roboto" font
    //Utils.loadGFont('Roboto');
    Utils.loadGFont('Open Sans');
    // Load datasets
    this.loadData();
  }

  /**
   * Update the state of the main component, scrolling to new sections when needed
   * @param {object} state - The new settings for `state`
   * @param {boolean} mapChanged - `true` when this change involves map points
   */
  updateMainState = (state, mapChanged = true, currentProgramsChanged = false) => {
    this.setState({ ...state, mapChanged });
    window.requestAnimationFrame(() => {
      if (currentProgramsChanged)
        this.updateLayersDensity(this.state.programa ? new Set([this.state.programa]) : this.state.currentPrograms);
      const target = document.getElementById('filler');
      if (target)
        target.scrollIntoView({ behavior: 'smooth' });
      if (mapChanged)
        window.setTimeout(() => this.setState({ mapChanged: false }), 0);
    });
  };

  /**
   * Update the `density` value of each polygon, based on the number of schools enroled to
   * the current programs among the total number of schools on the polygon having at least
   * one of the educational levels targeted by at least one of the current programs.
   * Values can also be filtered by school year.
   * @param {Set} currentPrograms - Set with the `id`s of the programs to be included on the calculation
   * @param {string=} curs - School year to be used. Defaults to `null`, so including all years.
   */
  updateLayersDensity = (currentPrograms, curs = null) => {

    const { poligons, programes } = this.data;

    // Clear base arrays
    poligons.forEach(poli => {
      // Clear current density
      poli.density = MIN_DENSITY;

      // `estudisBase` will be filled with the total number of centres of each educational level involved in at least one current program
      // key: educational level (EINF2C, EPRI...)      
      // value: number of schools having this educational level on this polygon
      poli.estudisBase = {}

      // `estudisPart` will be filled with the total number of centres participating in at least one current program.
      // key: educational level (EINF2C, EPRI...)      
      // value: number of centers of this type participating in current programs in this polygon
      poli.estudisPart = {}
    });

    // Object with all `centres` participating in current programs
    // key: school id
    // value: school
    const currentCentres = {};

    // For program, fill `estudisBase` and `currentCentres`
    currentPrograms.forEach(pid => {
      const program = programes.get(pid);
      if (program && program.tipus.length && Object.keys(program.centres).length) {
        program.tipus.forEach(t => {
          poligons.forEach(poli => {
            poli.estudisBase[t] = poli.centres[t] || 0;
          });
        });

        Object.keys(program.centres).forEach(ce => {
          if (!curs || ce === curs) {
            program.centres[ce].forEach(centre => {
              currentCentres[centre.id] = centre;
            });
          }
        });
      }
    });

    // For each school, fill `estudisPart` on their associated polygons (ST and SZ)
    Object.values(currentCentres).forEach(centre => {
      const st = poligons.get(centre.sstt);
      const se = poligons.get(centre.se);
      centre.estudis.forEach(tipus => {
        if (st && st.estudisBase[tipus])
          st.estudisPart[tipus] = (st.estudisPart[tipus] ? st.estudisPart[tipus] + 1 : 1);
        if (se && se.estudisBase[tipus])
          se.estudisPart[tipus] = (se.estudisPart[tipus] ? se.estudisPart[tipus] + 1 : 1);
      });
    });

    // Finally, calculate the density of each polygon
    // (ratio between the summations of `estudisPart` and `estudisBase`)
    let maxDensityST = 0, maxDensitySE = 0;
    poligons.forEach(poli => {
      let n = 0, d = 0;
      Object.keys(poli.estudisPart).forEach(tipus => {
        if (poli.estudisBase[tipus]) {
          n += poli.estudisPart[tipus];
          d += poli.estudisBase[tipus];
        }
      });
      if (d > 0) {
        poli.density = n / d;
        if (poli.tipus === 'ST')
          maxDensityST = Math.max(maxDensityST, poli.density);
        else
          maxDensitySE = Math.max(maxDensitySE, poli.density);
      }
    });

    // Compute correction factors
    const factorST = (maxDensityST > MIN_DENSITY && maxDensityST < MINMAX_DENSITY)
      ? MINMAX_DENSITY / maxDensityST
      : maxDensityST > MAX_DENSITY
        ? MAX_DENSITY / maxDensityST
        : 1;
    const factorSE = (maxDensitySE > MIN_DENSITY && maxDensitySE < MINMAX_DENSITY)
      ? MINMAX_DENSITY / maxDensitySE
      : maxDensitySE > MAX_DENSITY
        ? MAX_DENSITY / maxDensitySE
        : 1;

    // Apply correction factors
    poligons.forEach(poli => poli.density *= (poli.tipus === 'ST' ? factorST : factorSE));
  }

  /**
   * Perform a full text search
   * @param {string} query - The text to serach for
   */
  search = (query) => {
    // TODO: Implement search feature!
    console.log(`Searching: "${query}"`);
    const queryResults = [];
    this.fuseFuncs.forEach(ff => queryResults.push(...ff.search(query)));
    console.log(queryResults);
    this.setState({ query, queryResults });
  }

  /**
   * Builds the App main component
   */
  render() {

    // Destructure `data` and `state`
    const data = this.data;
    const { error, loading, intro, currentPrograms, polygons, programa, centre, modeProgCentre, mapChanged, query, queryResults } = this.state;
    // TODO: Use React context providers and consumers
    // See: https://reactjs.org/docs/context.html
    const updateMainState = this.updateMainState;

    // Current app sections
    const menuItems = [
      { id: 'presenta', name: 'Presentació', action: () => this.updateMainState({ intro: true }), current: intro === true },
      { id: 'programes', name: 'Programes', action: () => this.updateMainState({ intro: false, centre: null, programa: null }), current: intro === false },
    ];

    return (
      <CssBaseline>
        <MuiThemeProvider theme={theme}>
          <Header {...{ menuItems, searchFn: this.search, updateMainState }} />
          <div id="filler" />
          <main>
            {
              (error && <Error error={error} refetch={this.loadData} />) ||
              (loading && <Loading />) ||
              (query && <Cerca id="cerca" {...{ query, queryResults, updateMainState }} />) ||
              (intro && <Presentacio id="presenta" {...{ updateMainState }} />) ||
              (centre && <FitxaCentre {...{ id: 'centre', centre, data, modeProgCentre, updateMainState }} />) ||
              (programa && <FitxaPrograma {...{ id: 'programa', programa, data, updateMainState }} />) ||
              (<Programes {...{ id: 'programes', data, currentPrograms, updateMainState }} />)
            }
            {
              !error && !loading && !intro && !query &&
              <MapSection {...{ id: 'mapa', data, currentPrograms, polygons, programa, centre, mapChanged, updateMainState }} />
            }
          </main>
          <Footer />
        </MuiThemeProvider>
      </CssBaseline>
    );
  }
}

export default App;
