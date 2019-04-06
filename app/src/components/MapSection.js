import React from 'react';
import MainMap from './MainMap';

function MapSection({ id, data, currentPoints }) {

  return (
    <section id={id} className="seccio mapa">
      <h2>Mapa</h2>
      <MainMap className="mapa" {...{ currentPoints }} />
    </section>
  );
}

export default MapSection;