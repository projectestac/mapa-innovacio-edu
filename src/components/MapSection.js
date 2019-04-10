import React from 'react';
import Paper from '@material-ui/core/Paper';
import MainMap from './MainMap';

function MapSection({ id, data: { programes }, programa, currentPrograms, currentPolygons, updateMainState }) {

  const singleProg = programa ? programes.find(p => p.id === programa) : null;
  
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
  if (programa)
    addSchoolsOfProgram(programa, points);
  else
    currentPrograms.forEach(prog => addSchoolsOfProgram(prog, points));

  return (
    <section className="seccio smapa">
      <Paper className="paper">
        <h4>Centres participants {singleProg ? `al programa "${singleProg.nom}"` : 'als programes seleccionats'}</h4>
        <MainMap className="mapa" {...{ points, polygons: currentPolygons, updateMainState }} />
      </Paper>
    </section>
  );
}

export default MapSection;