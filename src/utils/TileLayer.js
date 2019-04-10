import React from 'react';
import { TileLayer } from 'react-leaflet';

// Original OpenStreetMap
const osm = <TileLayer
  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>;

// Mapbox.com
// ATENCIÓ: Max. 50.000 visualitzacions / mes
// Veure https://mapbox.com
// Provar amb id: `mapbox.satellite`, `mapbox.streets`...
const mapbox = <TileLayer
  attribution='Dades del mapa © contribuïdors de <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imatges © <a href="https://www.mapbox.com/">Mapbox</a>'
  url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"
  id='mapbox.streets'
  accessToken="pk.eyJ1IjoiZnJuY2VzYyIsImEiOiJjanU1b3BkZ2owYThsNDR0M3A2MzBjczg2In0.5zKGaoSJeQOeiWZyOj8ByQ"
/>;

export default function ({ type = 'mapbox' }) {
  return type === 'mapbox' ? mapbox : osm;
}
