import React from 'react';
import { Map, Marker } from 'react-leaflet';
import TileLayer from '../utils/TileLayer';

// See ../utils/TileLayer for all available options
const TILE_LAYER = process.env.REACT_APP_TILE_LAYER || 'wikimedia';
const MAP_BOUNDS = [[40.50, 0.15], [42.90, 3.34]];

export default function MapaCentre({ point, center = [41.7, 1.8], zoom = 8, maxZoom = 19 }) {

  return (
    <Map
      className="mapa-centre"
      {...{ center, zoom, maxZoom, minZoom: zoom, maxBounds: MAP_BOUNDS }}
    >
      <TileLayer type={TILE_LAYER} />
      <Marker key={point.id} position={[point.lat, point.lng]} />
    </Map>
  )
}