import React from 'react';
import Paper from '@material-ui/core/Paper';
import MainMap from './MainMap';
import MapaCentre from './MapaCentre';

function MapSection({ id, data: { programes, centresByK }, programa, centre, currentPrograms, polygons, currentLayer, mapChanged, updateMainState }) {

  const singleProg = programa ? programes.find(p => p.id === programa) : null;
  const singleCentre = centre ? centresByK[centre] : null;
  const w = window.innerWidth;
  const zoom = w < 600 ? 7 : w < 820 ? 8 : w < 1300 ? 7 : 8;

  const addSchoolsOfProgram = (progId, dest) => {
    const prog = programes.find(p => p.id === progId);
    if (prog)
      Object.keys(prog.centres).forEach(curs => {
        prog.centres[curs].forEach(centre => {
          if (!dest.find(c => c.id === centre.id))
            dest.push(centre)
        });
      });
    return dest;
  };

  const points = [];
  if (!mapChanged) {
    if (singleCentre) {
      points.push(singleCentre);
    }
    else if (programa)
      addSchoolsOfProgram(programa, points);
    else
      currentPrograms.forEach(prog => addSchoolsOfProgram(prog, points));
  }

  return (
    <section className="seccio smapa">
      <Paper className="paper">
        {!singleCentre && <h4>Centres participants {singleProg ? `al programa "${singleProg.nom}"` : 'als programes seleccionats'}</h4>}

        {(singleCentre &&
          <MapaCentre
            {...{
              point: singleCentre,
              center: [singleCentre.lat, singleCentre.lng],
              zoom: 15,
              maxZoom: 19,
            }}
          />) ||
          <MainMap
            {...{
              points,
              polygons,
              center: [41.7, 1.8],
              zoom,
              maxZoom: 19,
              currentLayer,
              updateMainState
            }}
          />
        }
      </Paper>
    </section>
  );
}

export default MapSection;
