import React from 'react';

export const DEFAULT_DATA = {
  programes: new Map(),
  centres: new Map(),
  poligons: new Map(),
  ambitsCurr: new Set(),
  ambitsInn: new Set(),
  estudis: new Map(),
  nivells: new Map(),
};

export const DEFAULT_STATE = {
  loading: true,
  dataLoaded: false,
  error: false,
  polygons: [],
  currentPrograms: new Set(),
  program: null,
  delayedMapUpdate: true,
  // Inmutable attributes
  updateMap: () => null,
  fuseFuncs: [],
  menuItems: [],
  data: DEFAULT_DATA,
};

const AppContext = React.createContext(DEFAULT_STATE);

export default AppContext;