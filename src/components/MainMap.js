import React from 'react';
import { Map, Polygon, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import TileLayer from '../utils/TileLayer';
import MarkerClusterGroup from '../utils/MarkerClusterGroup';

// See ../utils/TileLayer for all available options
const TILE_LAYER = process.env.REACT_APP_TILE_LAYER || 'wikimedia';
const MAP_BOUNDS = [[40.50, 0.15], [42.90, 3.34]];

export default function MainMap({ points = [], polygons = [], currentLayer, center = [41.7, 1.8], zoom = 8, maxZoom = 19, updateMainState }) {

  // Line width and opacity of polygons
  const lineWidth = 2;
  const minOpacity = 0;
 
  const onBaseLayerChange = (ev) => {
    const layerIndex = polygons.findIndex(p => p.name === ev.name);
    if(layerIndex >=0)
      // updateMainState({currentLayer: layerIndex}, false);
      window.currentLayer = layerIndex;
    console.log(`Current layer: ${layerIndex}`)
  }
  const overlayChange = (type) => (ev) => {
    console.log(`Overlay changed ${type} for "${ev.name}"`);
  }
  const obreCentre = (id) => () => updateMainState({ centre: id });

  window.currentLayer = window.currentLayer || 0;

  return (
    <Map
      className="mapa markercluster-map"
      {...{ 
        maxZoom, 
        minZoom: zoom, 
        bounds: MAP_BOUNDS, 
        maxBounds: MAP_BOUNDS, 
        onBaseLayerChange,
        onOverlayAdd: overlayChange('add'),
        onOverlayRemove: overlayChange('remove'), 
      }}
    >
      <TileLayer type={TILE_LAYER} />
      <LayersControl position="topright">
        {polygons.map((p, i) => (
          <LayersControl.BaseLayer name={p.name} key={i} checked={i === window.currentLayer}>
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
        <LayersControl.Overlay name="Mostra els centres" checked={true}>
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
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Mostra la intensitat" checked={false}>
          <LayerGroup />
        </LayersControl.Overlay>
      </LayersControl>
    </Map>
  )
}
