/*!
 *  File    : components/MapaCentre.js
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
import { MapContainer, Marker } from 'react-leaflet';
import TileLayer from '../utils/TileLayer';

const MAP_BOUNDS = [[40.50, 0.15], [42.90, 3.34]];

export default function MapaCentre({ point, center = [41.7, 1.8], zoom = 8, maxZoom = 19 }) {

  return (
    <MapContainer
      className="mapa-centre"
      {...{ center, zoom, maxZoom, minZoom: 8, maxBounds: MAP_BOUNDS }}
    >
      <TileLayer />
      <Marker key={point.id} position={[point.lat, point.lng]} />
    </MapContainer>
  )
}