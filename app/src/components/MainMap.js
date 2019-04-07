import React, { Component } from 'react';
import { Map, Polygon, Marker, Popup } from 'react-leaflet';
import TileLayer from '../utils/TileLayer';
import MarkerClusterGroup from '../utils/MarkerClusterGroup';


export default class MainMap extends Component {

  constructor({ currentPoints = [], currentPolygons = [] }) {
    super();
    this.state = {
      currentPoints,
      currentPolygons,
      center: [41.7, 1.8],
      zoom: 8,
      maxZoom: 19,
    }
  }

  render() {
    const { currentPoints, currentPolygons, center, zoom, maxZoom } = this.state;

    return (
      <Map className="mapa markercluster-map" {...{ center, zoom, maxZoom }}>
        <TileLayer />
        {currentPolygons.map((p, n) => (
          <Polygon
            key={n}
            positions={p.poligons}
            weight={2}
            fillOpacity={0.1}
          />))}
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