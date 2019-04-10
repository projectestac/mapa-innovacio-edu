import React from 'react';
import { Map, Polygon, Marker, Popup } from 'react-leaflet';
import TileLayer from '../utils/TileLayer';
import MarkerClusterGroup from '../utils/MarkerClusterGroup';


export default function MainMap({ points = [], polygons = [], updateMainState }) {

  const center = [41.7, 1.8];
  const zoom = 8;
  const maxZoom = 19;

  // Line width and opacity of polygons
  const lineWidth = 2;
  const minOpacity = 0.1;

  const obreCentre = (id) => () => updateMainState({ centre: id });

  return (
    <Map className="mapa markercluster-map" {...{ center, zoom, maxZoom }}>
      <TileLayer />
      {polygons.map((p, n) => (
        <Polygon
          key={n}
          positions={p.poligons}
          weight={lineWidth}
          fillOpacity={minOpacity}
        />))}
      <MarkerClusterGroup clusterProps={{ showCoverageOnHover: false }}>
        {points.map(pt => (
          <Marker key={pt.id} position={[pt.lat, pt.lng]}>
            <Popup>
              <h4 style={{ cursor: 'pointer' }} onClick={obreCentre(pt.id)}>{pt.nom}</h4>
              {pt.adreca}<br />
              <a href={pt.web}>{pt.web}</a>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </Map>
  )
}