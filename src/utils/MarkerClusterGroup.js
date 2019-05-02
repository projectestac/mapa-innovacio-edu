// Workaround to erors in `react-leaflet-markercluster`
// From: https://github.com/YUzhva/react-leaflet-markercluster/issues/71#issuecomment-466393028

import { MapLayer, withLeaflet } from 'react-leaflet';
import L from 'leaflet';
require('leaflet.markercluster');
// Moved to `index.js`
// import 'leaflet.markercluster/dist/MarkerCluster.css';
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

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
