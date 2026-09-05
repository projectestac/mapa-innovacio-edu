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
import { TileLayer, WMSTileLayer } from 'react-leaflet';
import 'proj4leaflet';

const TILE_LAYER = process.env.REACT_APP_TILE_LAYER || 'ICGCSimple';

const LAYERS = {
  // Original OpenStreetMap
  osm: {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
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
  },
  // CartoDB
  cartoDB: {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key={accessToken}',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 19,
    accessToken: process.env.REACT_APP_CARTO_TOKEN || '',
  },
  // ICGC Base
  ICGCBase: {
    attribution: 'Institut Cartogràfic i Geològic de Catalunya - ICGC',
    url: 'https://geoserveis.icgc.cat/servei/catalunya/mapa-base/wms?',
    layers: 'simplificat',
    format: 'image/jpeg',
    continuousWorld: true,
    wms: true,
  },
  ICGCAdmin: {
    attribution: 'Institut Cartogràfic i Geològic de Catalunya - ICGC',
    url: 'https://geoserveis.icgc.cat/servei/catalunya/mapa-base/wmts/administratiu/MON3857NW/{z}/{x}/{y}.png',
    minZoom: 1,
    maxZoom: 19,
  },
  ICGCTopo: {
    attribution: 'Institut Cartogràfic i Geològic de Catalunya - ICGC',
    url: 'https://geoserveis.icgc.cat/servei/catalunya/mapa-base/wmts/topografic/MON3857NW/{z}/{x}/{y}.png',
    minZoom: 1,
    maxZoom: 19,
  },
  ICGCSimple: {
    attribution: 'Institut Cartogràfic i Geològic de Catalunya - ICGC',
    url: 'https://geoserveis.icgc.cat/servei/catalunya/mapa-base/wmts/simplificat/MON3857NW/{z}/{x}/{y}.png',
    minZoom: 1,
    maxZoom: 19,
  },
  ICGCFoto: {
    attribution: 'Institut Cartogràfic i Geològic de Catalunya - ICGC',
    url: 'https://geoserveis.icgc.cat/icc_mapesmultibase/noutm/wmts/orto/GRID3857/{z}/{x}/{y}.png',
    minZoom: 1,
    maxZoom: 19,
  },
  ICGCOrtoHibrida: {
    attribution: 'Institut Cartogràfic i Geològic de Catalunya - ICGC',
    url: 'https://geoserveis.icgc.cat/servei/catalunya/mapa-base/wmts/orto-hibrida/MON3857NW/{z}/{x}/{y}.png',
    minZoom: 1,
    maxZoom: 19,
  }


};

const BUILT_LAYERS = {};

function getTileLayer({ type = TILE_LAYER }) {
  if (!BUILT_LAYERS[type]) {
    if (LAYERS[type].wms) {
      LAYERS[type].crs = new window['L'].Proj.CRS(
        'EPSG:25831',
        '+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        { resolutions: [1100, 550, 275, 100, 50, 25, 10, 5, 2, 1, 0.5, 0.25] }
      );
      BUILT_LAYERS[type] = <WMSTileLayer {...LAYERS[type]} />;
    }
    else
      BUILT_LAYERS[type] = <TileLayer {...LAYERS[type]} />
  }
  return BUILT_LAYERS[type];
}

export default getTileLayer;
