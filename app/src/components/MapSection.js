import React from 'react';
import MainMap from './MainMap';

function MapSection({ id, data, currentPoints, currentPolygons }) {

  return (
    <section id={id} className="seccio">
      <h2>Mapa</h2>
      <MainMap className="mapa" {...{ currentPoints, currentPolygons }} />
      <p>Peu de secció</p>
    </section>
  );
}

export default MapSection;