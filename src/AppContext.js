import React from 'react';

export const DEFAULT_DATA = {
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
};

export const DEFAULT_STATE = {
  loading: true,
  dataLoaded: false,
  error: false,
  polygons: [],
  currentPrograms: new Set(),
  // Possible values are `perCurs` and `agregat`
  modeProgCentre: 'agregat',
  delayedMapUpdate: true,
  // Immutable attributes:
  updateMap: () => null,
  fuseFuncs: [],
  menuItems: [],
  data: DEFAULT_DATA,
};

const AppContext = React.createContext(DEFAULT_STATE);

export default AppContext;