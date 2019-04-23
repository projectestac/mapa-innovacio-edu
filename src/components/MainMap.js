import React from 'react';
import { Map, Polygon, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import TileLayer from '../utils/TileLayer';
import MarkerClusterGroup from '../utils/MarkerClusterGroup';
import Utils from '../utils/Utils';

// See ../utils/TileLayer for all available options
const TILE_LAYER = process.env.REACT_APP_TILE_LAYER || 'wikimedia';
const MAP_BOUNDS = [[40.50, 0.15], [42.90, 3.34]];

export default function MainMap({ points = [], polygons = [], programa, center = [41.7, 1.8], zoom = 8, maxZoom = 13, updateMainState }) {

  // Optional overlays
  const OVERLAYS = [
    {
      name: 'Mostra la participació per zones',
      flag: 'showDensity',
      default: false,
    },
    {
      name: 'Mostra els centres',
      flag: 'showCentres',
      default: true,
    },
  ];

  // Line width and opacity of polygons
  const lineWidth = 2;
  const minOpacity = 0;

  const onBaseLayerChange = (ev) => {
    const layerIndex = polygons.findIndex(p => p.name === ev.name);
    if (layerIndex >= 0) {
      window.currentLayer = layerIndex;
      if (window[OVERLAYS[0].flag])
        updateMainState({}, false);
    }
  }

  const overlayChange = (type) => (ev) => {
    const ov = OVERLAYS.findIndex(ov => ov.name === ev.name);
    if (ov >= 0) {
      const overlayVisible = (type === 'add');
      window[OVERLAYS[ov].flag] = overlayVisible;
      if (ov === 0 && overlayVisible)
        updateMainState({}, false);
    }
  }


  // Save `currentLayer`, `showDensity` and `showCentres` as global variables to avoid unnecessary refreshing of the app state

  // Current layer defaults to "SEZ" (índex 1)
  window.currentLayer = window.currentLayer || 0;

  OVERLAYS.forEach(ov => {
    window[ov.flag] = typeof window[ov.flag] === 'undefined' ? ov.default : window[ov.flag];
  });

  const obreCentre = (id) => () => updateMainState({ centre: id });

  const popupCentre = (centre) => (
    <Popup>
      <h4 style={{ cursor: 'pointer' }} onClick={obreCentre(centre.id)}>{centre.nom}</h4>
      {centre.adreca}<br />
      <a href={centre.web}>{centre.web}</a>
    </Popup>
  );

  // TODO: Implementar fitxa de zona / servei territorial
  const obreZona = (nom) => () => console.log(nom);

  const popupZona = (zona) => {
    const estudisPart = Utils.sumAll(zona.estudisPart);
    const estudisBase = Utils.sumAll(zona.estudisBase);
    const perCent = (estudisBase > 0 ? (estudisPart / estudisBase) * 100 : 0).toFixed();
    return <Popup>
      <h4 style={{ cursor: 'pointer' }} onClick={obreZona(zona.nom)}>{zona.nom}</h4>
      <p>
        Etapes participants {programa ? 'al programa seleccionat' : 'als programes seleccionats'}: {estudisPart}<br />
        Etapes potencialment participants: {estudisBase}<br />
        Índex de participació: {perCent}%
      </p>
    </Popup>
  };

  return (
    <Map
      className="mapa markercluster-map"
      {...{
        maxZoom,
        minZoom: zoom,
        bounds: MAP_BOUNDS,
        maxBounds: MAP_BOUNDS,
        onBaseLayerChange,
        onOverlayAdd: overlayChange('add'),
        onOverlayRemove: overlayChange('remove'),
      }}
    >
      <TileLayer type={TILE_LAYER} />
      <LayersControl position="topright">
        {polygons.map((p, i) => (
          <LayersControl.BaseLayer name={p.name} key={i} checked={i === window.currentLayer}>
            <LayerGroup>
              {p.shapes.map((sh, n) => (
                <Polygon
                  key={n}
                  positions={sh.poligons}
                  weight={lineWidth}
                  fillOpacity={minOpacity}
                >
                  {popupZona(sh)}
                </Polygon>))}
            </LayerGroup>
          </LayersControl.BaseLayer>
        ))}
        <LayersControl.Overlay name={OVERLAYS[0].name} checked={window[OVERLAYS[0].flag]}>
          <LayerGroup>
            {polygons[window.currentLayer].shapes.map((sh, n) => (
              <Polygon
                key={n}
                positions={sh.poligons}
                weight={0}
                fillOpacity={sh.density}
              >
                {popupZona(sh)}
              </Polygon>))}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name={OVERLAYS[1].name} checked={window[OVERLAYS[1].flag]}>
          <MarkerClusterGroup clusterProps={{ showCoverageOnHover: false }}>
            {points.map(pt => (
              <Marker key={pt.id} position={[pt.lat, pt.lng]}>
                {popupCentre(pt)}
              </Marker>
            ))}
          </MarkerClusterGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </Map>
  )
}
