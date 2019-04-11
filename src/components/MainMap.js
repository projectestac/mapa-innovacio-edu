import React from 'react';
import { Map, Polygon, Marker, Popup } from 'react-leaflet';
import TileLayer from '../utils/TileLayer';
import MarkerClusterGroup from '../utils/MarkerClusterGroup';

// See ../utils/TileLayer for all available options
const TILE_LAYER = process.env.REACT_APP_TILE_LAYER || 'wikimedia';

export default function MainMap({ points = [], polygons = [], center = [41.7, 1.8], zoom = 8, maxZoom = 19, isCentre = false, updateMainState }) {

  // Line width and opacity of polygons
  const lineWidth = 2;
  const minOpacity = 0.1;

  const obreCentre = (id) => () => isCentre ? null : updateMainState({ centre: id });

  return (
    <Map className={`${isCentre ? 'mapa-centre' : 'mapa'} markercluster-map`} {...{ center, zoom, maxZoom }}>
      <TileLayer type={TILE_LAYER} />
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
              <h4 style={isCentre ? {} : { cursor: 'pointer' }} onClick={obreCentre(pt.id)}>{pt.nom}</h4>
              {pt.adreca}<br />
              <a href={pt.web}>{pt.web}</a>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </Map>
  )
}