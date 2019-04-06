import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from '../utils/MarkerClusterGroup';


export default class MainMap extends Component {

  constructor({ currentPoints = [] }) {
    super();
    this.state = {
      currentPoints,
      center: [41.7, 1.8],
      zoom: 8,
      maxZoom: 19,
    }
  }

  render() {
    const { currentPoints, center, zoom, maxZoom } = this.state;

    return (
      <Map className="mapa markercluster-map" {...{ center, zoom, maxZoom }}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup clusterProps={{ showCoverageOnHover: false }}>
          {currentPoints.map(pt => (
            <Marker key={pt.id} position={[pt.lat, pt.lng]}>
              <Popup>
                <h5>{pt.nom}</h5>
                {pt.adreca}<br />
                <a href={pt.web}>{pt.web}</a>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </Map>
    )
  }
}