import React from 'react';
import { Map, Polygon, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import TileLayer from '../utils/TileLayer';
import MarkerClusterGroup from '../utils/MarkerClusterGroup';

// See ../utils/TileLayer for all available options
const TILE_LAYER = process.env.REACT_APP_TILE_LAYER || 'wikimedia';
const MAP_BOUNDS = [[40.50, 0.15], [42.90, 3.34]];

export default function MainMap({ points = [], polygons = [], center = [41.7, 1.8], zoom = 8, maxZoom = 19, updateMainState }) {

  // Line width and opacity of polygons
  const lineWidth = 2;
  const minOpacity = 0;

  const obreCentre = (id) => () => updateMainState({ centre: id });

  return (
    <Map
      className="mapa markercluster-map"
      {...{ maxZoom, minZoom: zoom, bounds: MAP_BOUNDS, maxBounds: MAP_BOUNDS }}
    >
      <TileLayer type={TILE_LAYER} />
      <LayersControl position="topright">
        {polygons.map((p, i) => (
          <LayersControl.BaseLayer name={p.name} key={i} checked={i === 0}>
            <LayerGroup>
              {p.shapes.map((sh, n) => (
                <Polygon
                  key={n}
                  positions={sh.poligons}
                  weight={lineWidth}
                  fillOpacity={minOpacity}
                />))}
            </LayerGroup>
          </LayersControl.BaseLayer>
        ))}
      </LayersControl>
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