import React from 'react';
import { Map, Marker } from 'react-leaflet';
import TileLayer from '../utils/TileLayer';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';

function FitxaCentre({ id, centre, data: { programes, centresByK }, updateGlobalState }) {

  // Find the specified program
  const thisCentre = centresByK[centre];
  if (!thisCentre) {
    updateGlobalState({ error: `No hi ha cap centre amb el codi: ${centre}` });
    return null;
  }

  // Els camps tipus, sstt, se també estan disponibles
  const { nom, municipi, comarca, lat, lng, estudis, adreca, web, logo, nodes, web_propi, tel, mail, twitter } = thisCentre;
  const coords = [lat, lng];
  const url = nodes || web || web_propi;
  const tancaFitxa = () => updateGlobalState({ centre: null });

  return (
    <section id={id} className="seccio centre">
      <Paper className="paper">
        <Button className="torna" aria-label="Torna" onClick={tancaFitxa} >
          <ArrowBack className="leftIcon" />
          Torna
         </Button>
        {logo && <div id="logo"><img src={logo} alt={nom}></img></div>}
        <h3>{nom}</h3>
        <div id="adreca">
          <p>
            {adreca}<br />
            {municipi} ({comarca})<br />
            {tel && <>{`Tel. ${tel}`}<br /></>}
            {mail && <>{mail}<br /></>}
            {twitter && <><a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer">{twitter}</a><br /></>}
          </p>
        </div>

        <Map className="mapa-centre" {...{ center: coords, zoom: 15, maxZoom: 19 }}>
          <TileLayer />
          <Marker position={coords} />
        </Map>

        {url && <div id="link"><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></div>}
        <div id="estudis">
          <p>ESTUDIS: {estudis.join(', ')}</p>
        </div>
        <div id="projectes">
          <h4>Projectes...</h4>
        </div>
      </Paper>
    </section>
  );
}

export default FitxaCentre;