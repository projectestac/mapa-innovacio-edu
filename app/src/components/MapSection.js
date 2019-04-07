import React from 'react';
import Paper from '@material-ui/core/Paper';
import MainMap from './MainMap';

function MapSection({ id, data, currentPoints, currentPolygons }) {

  return (
    <section id={id} className="seccio smapa">
      <Paper className="paper">
        <MainMap className="mapa" {...{ currentPoints, currentPolygons }} />
      </Paper>
    </section>
  );
}

export default MapSection;