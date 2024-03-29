/*!
 *  File    : App.js
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

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { HashRouter, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import CheckRouteChanges from './utils/CheckRouteChanges';
import ReactGA from 'react-ga';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import Fuse from 'fuse.js';
import { handleFetchErrors, loadGFont } from './utils/Utils';
import Header from './components/Header';
import Presentacio from './components/Presentacio';
import Programes from './components/Programes';
import Xarxes from './components/Xarxes';
import FitxaPrograma from './components/FitxaPrograma';
import FitxaCentre from './components/FitxaCentre';
import FitxaZona from './components/FitxaZona';
import FitxaProjecte from './components/FitxaProjecte';
import Error from './components/Error';
import Loading from './components/Loading';
import Footer from './components/Footer';
import Cerca from './components/Cerca';
import EmbedLink from './components/EmbedLink';
import { webAppInstallInit } from './utils/WebAppInstall';
import rehypeRaw from 'rehype-raw';

/**
 * Miscellanous values taken from environment variables
 * and from files: `.env`, `.env.development` and `.env.production`
 */
import info from '../package.json';
const { homepage: HOMEPAGE = '' } = info;
const MAX_DENSITY = process.env.REACT_APP_MAX_DENSITY || 0.8;
const MIN_DENSITY = process.env.REACT_APP_MIN_DENSITY || 0.000001;
const MINMAX_DENSITY = process.env.REACT_APP_MINMAX_DENSITY || 0.4;
const DEBUG_GLOBAL_VAR = process.env.REACT_APP_DEBUG_GLOBAL_VAR || '';
const ANALYTICS_UA = process.env.REACT_APP_ANALYTICS_UA || 'UA-140680188-1';
const HASH_TYPE = process.env.REACT_APP_HASH_TYPE || 'no-hash';
const HASH = HASH_TYPE === 'no-hash' ? '' : HASH_TYPE === 'hashbang' ? '#!/' : HASH_TYPE === 'slash' ? '#/' : '#';
const LOGO_BASE = process.env.REACT_APP_LOGO_BASE || 'https://clic.xtec.cat/pub/logos/';
const FITXA_BASE = process.env.REACT_APP_FITXA_BASE || 'https://clic.xtec.cat/pub/innovacio/fitxes/';
const FITXA_PROJ_BASE = process.env.REACT_APP_FITXA_PROJ_BASE || 'https://clic.xtec.cat/pub/innovacio/projectes/';
const PRJLOGOS_BASE = process.env.REACT_APP_PRJLOGOS_BASE || 'https://clic.xtec.cat/pub/innovacio/logos/';
const PRJLOGOS_PATH = `${PRJLOGOS_BASE.startsWith('/') ? HOMEPAGE : ''}${PRJLOGOS_BASE}`;
const JSON_BASE = process.env.REACT_APP_JSON_BASE || 'https://clic.xtec.cat/pub/innovacio/data/';
const DATA_PATH = `${JSON_BASE.startsWith('/') ? HOMEPAGE : ''}${JSON_BASE}`;

// Set the appropiate Router, based on HASH_TYPE
const Router = HASH_TYPE === 'no-hash' ? BrowserRouter : HashRouter;

/**
 * Main Material-UI theme
 */
const theme = responsiveFontSizes(
  createTheme({
    palette: {
      // Gencat dark gray
      primary: { main: '#333' },
      // Gencat red
      secondary: { main: '#c00000' },
      // Material-UI red
      error: { main: '#f44336' },
    },
    typography: {
      fontFamily: '"Open Sans", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontDisplay: 'swap',
    },
    overrides: {
      MuiStepIcon: {
        completed: {
          color: '#c00000 !important',
        }
      },
      MuiStepLabel: {
        label: {
          fontSize: '0.8rem',
        }
      }
    },
  })
);

/**
 * Initialize the PWA installer
 * See: https://developers.google.com/web/fundamentals/app-install-banners/
 */
webAppInstallInit();

/**
 * Initialize GA
 */
if (ANALYTICS_UA)
  ReactGA.initialize(ANALYTICS_UA);

/**
 * React [Context](https://reactjs.org/docs/context.html) used to pass data through the component tree
 * without having to pass props down manually at every level.
 */
export const AppContext = React.createContext();

/**
 * This is the main React component of the web app
 * Its `state` is shared with components through `AppContext`
 */
class App extends Component {

  // Needed for React Context
  // See: https://reactjs.org/docs/context.html#classcontexttype
  static contextType = AppContext;

  // Reference to the router object
  routerRef = React.createRef();

  constructor() {
    super();

    // Get search params from current URL
    const params = new URLSearchParams(window.location.search);

    // Main menu entries
    this.menuItems = [
      {
        id: 'presenta',
        name: 'Presentació',
        path: '/',
      },
      {
        id: 'programes',
        name: 'Programes',
        path: '/programes',
      },
      {
        id: 'projectes',
        name: 'Projectes',
        path: '/programa/1001',
      },
      {
        id: 'practiques',
        name: 'Pràctiques',
        path: '/programa/2001',
      },
      {
        id: 'xarxes',
        name: 'Xarxes',
        path: '/xarxes',
      },
    ];

    // Set the initial state
    this.state = {

      // Mutable attributes
      loading: true,
      dataLoaded: false,
      error: false,
      polygons: [],
      currentPrograms: new Set(),
      currentXarxes: new Set(),
      programa: null,
      cursos: [],
      mapChanged: false,
      tabMode: false,
      currentTab: 0,
      currentPrjTab: 0,
      dlgOpen: false,
      dlgXarxesOpen: false,

      // Inner references
      updateMap: this.updateMap.bind(this),
      updateXarxesMap: this.updateXarxesMap.bind(this),
      fuseFuncs: [],
      menuItems: this.menuItems,

      // Immutable attributes (to be filled by `loadData`)
      data: {
        programes: new Map(),
        onlyProgs: new Map(),
        onlyXarxes: new Map(),
        centres: new Map(),
        poligons: new Map(),
        estudis: new Map(),
        nivells: new Map(),
        ambitsCurr: new Map(),
        ambitsInn: new Map(),
        cursosDisp: [],
      },

      // Immutable settings
      settings: {
        HASH_TYPE,
        HASH,
        HOMEPAGE,
        LOGO_BASE,
        PRJLOGOS_PATH,
        FITXA_BASE,
        FITXA_PROJ_BASE,
        APP_BASE: `${window.location.origin}${HOMEPAGE}/${HASH}`,
        EMBED: params.has('embed') || params.has('embedMap'),
        EMBED_MAP: params.has('embedMap'),
        // Options for React-Markdown
        // See: https://github.com/rexxars/react-markdown#options
        MD_OPTIONS: {
          rehypePlugins: [rehypeRaw],
        },
      }
    };

    // Flag indicating that the first path should be reported to GA
    this.firstView = true;
  }

  /**
   * Should be called on all the updates of `this.state`
   * @param {Object} values - The state values to be updated
   * @param {Function=} callback - Optional callback method to be called immediatly after state is updated
   */
  setStateMod(values, callback = null) {
    this.setState(values, () => {

      // Global variable used to quickly inspect `this.state` on the debug console
      // `REACT_APP_DEBUG_GLOBAL_VAR` should be set only in `.env.development`
      if (DEBUG_GLOBAL_VAR)
        window[DEBUG_GLOBAL_VAR] = this.state;

      if (callback)
        callback();
    });
  }

  /**
   * Load the datasets from JSON files and makes some arrangements with internal variables
   * @returns {Promise}
   */
  loadData() {
    // Set the app in "loading" mode
    this.setStateMod({ loading: true });

    return Promise.all(
      // Launch all fetch promises in parallel
      [
        `${DATA_PATH}programes.json`,
        `${DATA_PATH}instancies.json`,
        `${DATA_PATH}centres.json`,
        `${DATA_PATH}poligons.json`,
        `${DATA_PATH}estudis.json`,
      ].map(uri => {
        return fetch(uri, { method: 'GET', credentials: 'same-origin' })
          .then(handleFetchErrors)
          .then(response => response.json());
      })
    )
      .then(([_programes, _instancies, _centres, _poligons, _estudis]) => {

        // Build an object with centre ids as keys, useful for optimizing searches
        _centres.forEach(c => {
          c.programes = {};
          c.allPrograms = new Set();
          c.notCert = new Set();
        });

        // Convert synthetic multi-point expressions into arrays of co-ordinates suitable for leaflet polygons
        _poligons.forEach(p => {
          p.poligons = p.poligons.map(pts => pts.split(',').map(pt => pt.split('|').map(vs => Number(vs))));
          p.centresInn = new Set();
          p.programes = new Set();
          p.density = MIN_DENSITY;
          p.estudisBase = {};
          p.estudisPart = {};
          p.centresPart = new Set();
        });

        // Read current school courses
        const { cursos: cursosDisp, cursMin, cursMax } = _estudis;

        // Prepare sets for auto-detected data
        const currentPrograms = new Set();
        const currentXarxes = new Set()

        // Initialize transient properties
        _programes.forEach(p => {
          // Set all programs initially selected, excluding `projectes` and `pràctiques`
          if (p.id.length < 4)
            currentPrograms.add(p.id);
          // Set al networks initially selected
          else if (p.id.length === 4 && p.id.startsWith('3'))
            currentXarxes.add(p.id);
          // Initialize `centres` and `allCentres` (to be filled later)
          p.centres = {};
          p.allCentres = new Set();
        });

        // Convert arrays to maps
        const centres = new Map(_centres.map(c => [c.id, c]));
        // 'programes' should contain 'programes', 'pràctiques' and 'experiencies'
        const programes = new Map(_programes.map(p => [p.id, p]));
        // 'onlyProgs' contains only 'programes' 
        const onlyProgs = new Map(_programes.filter(p => p.id.length < 4).map(p => [p.id, p]))
        // 'onlyXarxes' contains only 'xarxes' 
        const onlyXarxes = new Map(_programes.filter(p => p.id.length === 4 && p.id.startsWith('3')).map(p => [p.id, p]))
        const poligons = new Map(_poligons.map(p => [p.key, p]));

        // Initialize arrays of `centres` for each program, and `programa` for each centre, by `curs`
        _instancies.forEach(({ programa, centre, curs: courseRange, titol, cert, fitxa, video, url, comentari }) => {
          const prog = programes.get(programa);
          const cent = centres.get(centre);

          if (!prog || !cent) {
            console.log(`WARNING: Instància amb programa o centre desconegut: ${programa} - ${centre} - ${courseRange}`);
            return;
          }

          // Process a range of courses
          const courses = [];
          const k = cursosDisp.indexOf(courseRange);
          if (k >= 0)
            courses.push(cursosDisp[k]);
          else {
            const iniYear = Number(courseRange.substring(0, 4));
            const endYear = Number(courseRange.substring(5, 9));
            let err = isNaN(iniYear) || isNaN(endYear) || endYear <= iniYear;
            if (!err)
              for (let y = Math.max(cursMin, iniYear); y < Math.min(cursMax, endYear) && !err; y++) {
                const k = cursosDisp.indexOf(`${y}-${y + 1}`);
                if (k < 0)
                  err = true;
                else
                  courses.push(cursosDisp[k]);
              }
            if (err)
              console.log(`ERROR: Instància amb indicació de cursos incorrecta: ${programa} - ${centre} - ${courseRange}`);
          }

          courses.forEach(curs => {
            // Add cent to prog course map
            if (!prog.centres[curs])
              prog.centres[curs] = [];
            prog.centres[curs].push(cent);
            prog.allCentres.add(cent);

            // Add prog to cent course map
            if (!cent.programes[curs])
              cent.programes[curs] = [];
            cent.programes[curs].push(prog);
            cent.allPrograms.add(prog);

            // Add prog and cent to SSTT
            if (cent.sstt) {
              const p = poligons.get(cent.sstt);
              p.centresInn.add(cent);
              p.programes.add(prog);
            }

            // Add prog and cent to SE
            if (cent.se) {
              const p = poligons.get(cent.se);
              p.centresInn.add(cent);
              p.programes.add(prog);
            }

            // Build complex title when comentari exists
            if (comentari) {
              titol = titol || comentari;
              // Avoid duplicate comments
              if (!titol.includes(comentari))
                titol = `${titol} (${comentari})`;
            }

            // Build info object
            if (titol) {
              const info = {
                titol,
                curs,
              };
              if (fitxa)
                info.fitxa = fitxa;
              if (video)
                info.video = video;
              if (url)
                info.url = url;

              // Add info to prog
              if (!prog.info)
                prog.info = {};
              if (!prog.info[cent.id])
                prog.info[cent.id] = [];
              prog.info[cent.id].push(info);

              // Add info to cent
              if (!cent.info)
                cent.info = {};
              if (!cent.info[prog.id])
                cent.info[prog.id] = [];
              cent.info[prog.id].push(info);
            }

            // Set 'not cert' info
            if (!cert)
              cent.notCert.add(`${programa}|${curs}`);
          });
        });


        // Summarize and put in order programs and schools
        centres.forEach(c => {
          c.allPrograms = Array.from(c.allPrograms).sort((a, b) => a.nom.localeCompare(b.nom));
        });
        programes.forEach(p => {
          p.allCentres = Array.from(p.allCentres).sort((a, b) => a.nom.localeCompare(b.nom));
        });

        // Build the Fuse.js objects
        // See: https://fusejs.io/
        const fuseOptions = {
          isCaseSensitive: false,
          //shouldSort: true,
          //tokenize: true,
          //matchAllTokens: true,
          includeScore: false,
          includeMatches: false,
          //threshold: 0.2,
          minMatchCharLength: 2,
          shouldSort: true,
          findAllMatches: true,
          location: 0,
          threshold: 0.2,
          // Provide a big distance to avoid null matches!
          distance: 100000,
          useExtendedSearch: false,
          tokenize: true,
          matchAllTokens: true,
          maxPatternLength: 32,
          // minMatchCharLength: 2,
        };

        const fuseFuncs = [
          new Fuse(
            _programes.map(({ id, nom, simbol, text }) => ({
              id,
              nom,
              simbol,
              text,
              tipus: 'programa',
            })),
            { ...fuseOptions, keys: ['text'] }),
          new Fuse(
            _centres.map(({ id, nom, text }) => ({
              id,
              nom,
              text,
              tipus: 'centre',
            })),
            { ...fuseOptions, keys: ['text'] }),
        ];

        // Build the main data container
        const data = {
          ...this.state.data,
          programes,
          onlyProgs,
          onlyXarxes,
          centres,
          poligons,
          estudis: new Map(Object.entries(_estudis.estudis)),
          nivells: new Map(Object.entries(_estudis.nivells)),
          ambitsCurr: new Map(Object.entries(_estudis.ambitsCurr)),
          ambitsInn: new Map(Object.entries(_estudis.ambitsInn)),
          cursosDisp,
        };

        // Finally, update the main state
        this.setStateMod({
          data,
          dataLoaded: true,
          polygons: [
            { name: 'Serveis Territorials', shapes: _poligons.filter(p => p.tipus === 'ST') },
            { name: 'Serveis Educatius de Zona', shapes: _poligons.filter(p => p.tipus === 'SEZ') },
          ],
          cursos: [...cursosDisp],
          fuseFuncs,
          currentPrograms,
          currentXarxes,
          loading: false,
          error: false,
        });
      })
      .catch(error => {
        console.error('ERROR: Unable to load or process data', error);
        this.setStateMod({ error: error.toString() });
      });
  }

  /**
   * Checks if the content of the main page should be arranged in two tabs instead of two colums.
   * This should be done when the display width is below 840px.
   * @return {boolean} - `true` when in "tabs" mode
   */
  checkTabMode() {
    const tabs = window.matchMedia('(max-width: 840px)').matches;

    // Update state and map when tabs mode changes
    if (this.state.tabMode !== tabs) {
      this.updateMap({ tabMode: tabs });
      this.updateXarxesMap({ tabMode: tabs });
    }

    return tabs;
  }

  /**
   * Operations to be performed at startup
   */
  componentDidMount() {
    // Load Google's "Open Sans" font
    loadGFont('Open Sans');
    // Load datasets
    this.loadData()
      .then(() => {
        // Check if tabs should be used in main screen
        this.checkTabMode();
        // Recheck the `tabs` mode when window resizes
        window.addEventListener('resize', this.checkTabMode.bind(this));
        // Pseudo-asynchronous checking of map layers
        window.setTimeout(() => {
          // TODO: Avoid direct reference to the Router object. Use of `withRouter` instead.
          const currentPath = this.routerRef.current?.history.location.pathname;
          console.log(`INFO: Current location is: ${currentPath}`);
          this.checkForLayerUpdate(currentPath);
        }, 0);
      });
  }

  /**
   * Updates state and maps
   * @param {object} [state={}] - The new settings for `state`
   * @param {boolean} [mapChanged=true] - `true` when this change involves map points
   * @param {boolean} [currentProgramsChanged=false] - `true` when the list of current programs has changed
   * @param {function} [callback] - Optional function to be called after state is changed
   */
  updateMap(state = {}, mapChanged = true, currentProgramsChanged = false, callback = null) {
    // Update state
    // The `mapChanged` flag will prevent LeafLet to place popup points on the map
    this.setStateMod({ ...state, mapChanged, currentProgramsChanged }, callback);
    // Pseudo-asyncronously update layers and map
    window.requestAnimationFrame(() => {
      if (currentProgramsChanged)
        this.updateLayersDensity(this.state.programa ? new Set([this.state.programa]) : this.state.currentPrograms, this.state.cursos);
      if (mapChanged)
        // After the repainting of all components (timeout zero), refresh the map leaving the restriction to place points on it
        window.setTimeout(() => this.setStateMod({ mapChanged: false }), 0);
    });
  }

  /**
   * Updates state and maps for "xarxes"
   * @param {object} [state={}] - The new settings for `state`
   * @param {boolean} [mapChanged=true] - `true` when this change involves map points
   * @param {boolean} [currentXarxesChanged=false] - `true` when the list of current networks has changed
   * @param {function} [callback] - Optional function to be called after state is changed
   */
  updateXarxesMap(state = {}, mapChanged = true, currentXarxesChanged = false, callback = null) {
    // Update state
    // The `mapChanged` flag will prevent LeafLet to place popup points on the map
    this.setStateMod({ ...state, mapChanged, currentXarxesChanged }, callback);
    // Pseudo-asyncronously update layers and map
    window.requestAnimationFrame(() => {
      if (currentXarxesChanged)
        this.updateLayersDensity(this.state.programa ? new Set([this.state.programa]) : this.state.currentXarxes, this.state.cursos);
      if (mapChanged)
        // After the repainting of all components (timeout zero), refresh the map leaving the restriction to place points on it
        window.setTimeout(() => this.setStateMod({ mapChanged: false }), 0);
    });
  }

  /**
   * Called from CheckRouteChanges when a new path is entered
   * @param {object} props - New properties used, including a react-route location object
   * @param {object} prevProps - Old properties, used for checking changes
   */
  contentUpdated(props, prevProps) {
    // Check if there is a new pathname
    const haveNewLocation = props.location.pathname !== prevProps.location.pathname;

    // Report new path to GA
    if (ANALYTICS_UA && (haveNewLocation || this.firstView)) {
      this.firstView = false;
      ReactGA.pageview(props.location.pathname);
    }

    // Check if layers should be updated and scroll up
    if (haveNewLocation) {
      console.log(`INFO: New location: ${props.location.pathname}`)
      this.checkForLayerUpdate(props.location.pathname);
      window.scrollTo(0, 0);
    }
  };

  /**
   * Checks if the polygons density needs to be recalculated, based on the current path
   * @param {string} pathname - Current path
   */
  checkForLayerUpdate(pathname) {
    if (/^\/(programes|programa\/|centre\/|zona\/)/.test(pathname || '')) {
      const check = /^\/programa\/(.*)$/.exec(pathname);
      const programa = check && check.length === 2 ? check[1] : null;
      this.updateMap({ programa }, true, true);
      this.updateXarxesMap({ programa }, true, true);
    }
  };

  /**
   * Updates the `density` value on each polygon, based on the number of schools enroled to
   * the current programs among the total number of schools on the polygon having at least
   * one of the educational levels targeted by at least one of the current programs.
   * Values can also be filtered by school year.
   * @param {Set} selectedElements - Set with the `id`s of the programs or networks to be included on the calculation
   * @param {string[]=} cursos - School years to be considered. Defaults to _null_, meaning all available years.
   * @param {object=} data - Object containing the current datasets. Defaults to `data` in the current state.
   */
  updateLayersDensity(selectedElements, cursos = null, data = this.state.data) {

    // De-structure the needed fields of `data`
    const { poligons, programes } = data;

    // Clear base arrays
    poligons.forEach(poli => {
      // Clear current density
      poli.density = MIN_DENSITY;

      // `estudisBase` will be filled with the number of "school groups" involved in at least
      // one of the current programs, where each "school group" is an educational level inside a school.
      // key: educational level (EINF2C, EPRI...)      
      // value: number of "school groups" of this educational level on this polygon
      poli.estudisBase = {};

      // `estudisPart` will be filled with the total number of "school groups" participating in at least
      // one of the current programs, where each "school group" is an educational level inside a school.
      // key: educational level (EINF2C, EPRI...)      
      // value: number of "school groups" of this type participating in the current programs on this polygon
      poli.estudisPart = {};

      poli.centresPart = new Set();
    });

    // Object with all `centres` participating in current programs
    // key: school id
    // value: school
    const currentCentres = {};

    // For each program, fill `estudisBase` and `currentCentres`
    selectedElements.forEach(pid => {
      const program = programes.get(pid);
      if (program && program.tipus.length && Object.keys(program.centres).length) {
        program.tipus.forEach(t => {
          poligons.forEach(poli => {
            poli.estudisBase[t] = poli.centres[t] || 0;
          });
        });

        Object.keys(program.centres).forEach(ce => {
          if (!cursos || cursos.includes(ce)) {
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
        if (st && st.estudisBase[tipus]) {
          st.estudisPart[tipus] = (st.estudisPart[tipus] ? st.estudisPart[tipus] + 1 : 1);
          st.centresPart.add(centre.id);
        }
        if (se && se.estudisBase[tipus]) {
          se.estudisPart[tipus] = (se.estudisPart[tipus] ? se.estudisPart[tipus] + 1 : 1);
          se.centresPart.add(centre.id);
        }
      });
    });

    // Calculate the density of each polygon
    // (ratio between the summations of `estudisPart` and `estudisBase`)
    let maxDensityST = 0, maxDensitySE = 0;
    poligons.forEach(poli => {
      let n = 0, d = 0;
      Object.keys(poli.estudisBase).forEach(tipus => {
        if (poli.estudisBase[tipus]) {
          n += (poli.estudisPart[tipus] || 0);
          d += poli.estudisBase[tipus];
        }
      });
      if (d > 0) {
        poli.density = Math.max(MIN_DENSITY, n / d);
        if (poli.tipus === 'ST')
          maxDensityST = Math.max(maxDensityST, poli.density);
        else
          maxDensitySE = Math.max(maxDensitySE, poli.density);
      }
    });

    // Compute the correction factor for _Serveis Territorials_
    const factorST = (maxDensityST > MIN_DENSITY && maxDensityST < MINMAX_DENSITY)
      ? MINMAX_DENSITY / maxDensityST
      : maxDensityST > MAX_DENSITY
        ? MAX_DENSITY / maxDensityST
        : 1;

    // Compute the correction factor for _Serveis Educatius_
    const factorSE = (maxDensitySE > MIN_DENSITY && maxDensitySE < MINMAX_DENSITY)
      ? MINMAX_DENSITY / maxDensitySE
      : maxDensitySE > MAX_DENSITY
        ? MAX_DENSITY / maxDensitySE
        : 1;

    // Apply correction factors
    poligons.forEach(poli => poli.density *= (poli.tipus === 'ST' ? factorST : factorSE));
  }

  /**
   * Builds the App main component
   */
  render() {

    const { error, loading, settings: { EMBED, EMBED_MAP } } = this.state;

    return (
      <Router basename={HASH_TYPE === 'no-hash' ? HOMEPAGE : ''} hashType={HASH_TYPE} ref={this.routerRef}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <AppContext.Provider value={this.state}>
              <CheckRouteChanges updateHandler={this.contentUpdated.bind(this)}>
                <Helmet>
                  <title>Mapa de la innovació pedagògica de Catalunya</title>
                  <meta name="description" content="Projectes d'innovació educativa certificats pel Departament d'Educació de la Generalitat de Catalunya" />
                </Helmet>
                <div id="root" className={EMBED ? 'embed' : ''} >
                  {!EMBED && <Header />}
                  {!EMBED && <div className="filler" />}
                  <main className={`${EMBED ? 'embed' : ''} ${EMBED_MAP ? 'single-column' : ''}`.trim()}>
                    {
                      (loading && <Loading />) ||
                      (error && <Error {...{ error, refetch: this.loadData.bind(this) }} />) ||
                      <Switch>
                        <Route exact path="/" component={Presentacio} />
                        <Route path="/programes" component={Programes} />
                        <Route path="/xarxes" component={Xarxes} />
                        <Route path="/centre/:codi" component={FitxaCentre} />
                        <Route path="/programa/:id" component={FitxaPrograma} />
                        <Route path="/projecte/:id" component={FitxaProjecte} />
                        <Route path="/zona/:key" component={FitxaZona} />
                        <Route path="/cerca/:query" component={Cerca} />
                        <Redirect to="/" />
                      </Switch>
                    }
                  </main>
                  {EMBED && !loading && <EmbedLink />}
                  {!EMBED && <Footer />}
                </div>
              </CheckRouteChanges>
            </AppContext.Provider>
          </CssBaseline>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
