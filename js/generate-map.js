import { createAdvert } from './create-advert.js';

const createSpecialMarker = function (coords) {
  return L.marker(
    coords,
    {
      draggable: true,
      riseOnHover: true,
      icon: L.icon({
        iconUrl: '../img/main-pin.svg',
        iconSize: [52, 52],
        iconAnchor: [26, 52],
      }),
      zIndexOffset: 1,
      autoPan: true,
      autoPanPadding: [60, 60],
    },
  );
};
const createCommonMarker = function (coords) {
  return L.marker(
    coords,
    {
      riseOnHover: true,
      icon: L.icon({
        iconUrl: '../img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      }),
    },
  );
};

export class Map {
  constructor(container, coords) {
    this._initialCoords = coords;
    this._container = container;
    this._map = L.map(this._container).setView(coords, 13);
    this._markersLayer = L.layerGroup().addTo(this._map);
    this._map.setView(coords);
    this._specialMarker = createSpecialMarker(coords).addTo(this._map);
    this._mapLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    )
      .addTo(this._map);
  }

  setLoadCallback (callback) {
    this._map.whenReady(() => {
      callback();
    });
  }

  addMarkers(adverts) {
    adverts.forEach((advert) => {
      createCommonMarker(advert.location).addTo(this._markersLayer).bindPopup(createAdvert(advert));
    });
  }

  removeMarkers() {
    this._markersLayer.clearLayers();
  }

  closePopup() {
    this._markersLayer.bindPopup().closePopup();
  }

  reset () {
    this._map.setView(this._initialCoords, 13);
    this._specialMarker.setLatLng(this._initialCoords);
    this.removeMarkers();
  }

  setMoveCallback (callback) {
    this._specialMarker.on('moveend', () => {
      const [currentLat, currentLng] = [this._specialMarker.getLatLng().lat.toFixed(5), this._specialMarker.getLatLng().lng.toFixed(5)];
      callback(currentLat, currentLng);
    });
  }
}
