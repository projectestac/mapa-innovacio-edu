import React from 'react';
import { TileLayer } from 'react-leaflet';

const LAYERS = {
  // Original OpenStreetMap
  osm: {
    attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
  // Mapbox.com
  // ATENCIÓ: Max. 50.000 visualitzacions / mes
  // Veure https://mapbox.com
  // Provar amb id: `mapbox.satellite`, `mapbox.streets`...
  mapbox: {
    attribution: 'Dades del mapa © contribuïdors de <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imatges © <a href="https://www.mapbox.com/">Mapbox</a>',
    url: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
    id: 'mapbox.streets',
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN || '',
  },
  // Wikimedia
  wikimedia: {
    attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
    url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png',
    minZoom: 1,
    maxZoom: 19,
  }
};

const BUILT_LAYERS = {};

function getTileLayer({ type = 'wikimedia' }) {
  if (!BUILT_LAYERS[type])
    BUILT_LAYERS[type] = <TileLayer {...LAYERS[type]} />
  return BUILT_LAYERS[type];
}

export default getTileLayer;
