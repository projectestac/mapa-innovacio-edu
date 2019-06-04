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
