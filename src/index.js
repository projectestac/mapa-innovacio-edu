import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import '../node_modules/leaflet.markercluster/dist/MarkerCluster.css';
import '../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
