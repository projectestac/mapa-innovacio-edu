import React from 'react';

const AppContext = React.createContext({
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
  // Properties to be implemented in App
  updateMainState: () => { },
  searchFn: () => { },
  menuItems: [],
  data: {},
});

export default AppContext;