import React, { Component } from 'react';
import { Map, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
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
        {/* Original OpenStreetMap */}
        { /* 
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> 
        */}

        {/* Mapbox.com Provar amb id mapbox.satellite, mapbox.streets*/}
        <TileLayer
          attribution='Dades del mapa © contribuïdors de <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imatges © <a href="https://www.mapbox.com/">Mapbox</a>'
          url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"
          id='mapbox.streets'
          accessToken="pk.eyJ1IjoiZnJuY2VzYyIsImEiOiJjanU1b3BkZ2owYThsNDR0M3A2MzBjczg2In0.5zKGaoSJeQOeiWZyOj8ByQ"
        />
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