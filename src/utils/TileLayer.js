/*!
 *  File    : utils/TileLayer.js
 *  Created : 10/04/2019
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  Map of pedagogical innovation in Catalonia 
 *  https://innovacio.xtec.gencat.cat
 *
 *  @source https://github.com/projectestac/mapa-innovacio-edu
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2019 Educational Telematic Network of Catalonia (XTEC)
 *
 *  Licensed under the EUPL, Version 1.2 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 */

import React from 'react';
import { TileLayer } from 'react-leaflet';

const LAYERS = {
  // Original OpenStreetMap
  osm: {
    attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
  // Mapbox.com
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
