/*!
 *  File    : utils/MarkerClusterGroup.js
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

// Workaround to erors in `react-leaflet-markercluster`
// From: https://github.com/YUzhva/react-leaflet-markercluster/issues/71#issuecomment-466393028

import { MapLayer, withLeaflet } from 'react-leaflet';
import L from 'leaflet';
require('leaflet.markercluster');

// CSS imports moved to `../index.js`
// import 'leaflet.markercluster/dist/MarkerCluster.css';
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// Support for bulk adding markers 
// Based on: https://github.com/olabalboa/react-leaflet-markercluster/blob/master/src/react-leaflet-markercluster.js
// See: https://github.com/YUzhva/react-leaflet-markercluster/pull/86
L.MarkerClusterGroup.include({
  addLayer(layer) {
    if (!this._layerBuffer) {
      this._layerBuffer = new Set();
      setTimeout(() => {
        if (this._layerBuffer && this._layerBuffer.size)
          this.addLayers(Array.from(this._layerBuffer), true);
        this._layerBuffer = null;
      }, 0);
    }
    this._layerBuffer.add(layer);
  },
});

class MarkerClusterGroup extends MapLayer {
  createLeafletElement(props) {
    const { clusterProps = {} } = props;
    const el = new L.markerClusterGroup({ ...props, ...clusterProps });
    this.contextValue = {
      ...props.leaflet,
      layerContainer: el
    };
    return el;
  }
}

export default withLeaflet(MarkerClusterGroup);
