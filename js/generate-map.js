import { createAdvert } from './create-advert.js';
import { getCurrentAddress } from './form.js';

const centerCoords = document.querySelector('#address').dataset.centerCoords.split(',');

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

const specialMarker = createSpecialMarker(centerCoords);

export const createMap = function (parent, coords, action) {
  const map = L.map(parent)
    .setView(coords, 13);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  )
    .on('load', action)
    .addTo(map);
  return map;
};

export const appendMarkers = function (map, adverts) {
  const markersLayer = L.layerGroup().addTo(map);
  specialMarker.addTo(markersLayer);
  adverts.forEach((advert) => {
    createCommonMarker(advert.location).addTo(markersLayer).bindPopup(createAdvert(advert));
  });
};

export const resetMap = function (map, coords) {
  map.setView(coords, 13);
  specialMarker.setLatLng(coords);
};

export const getCurrentCoords = function () {
  specialMarker.on('moveend', () => {
    getCurrentAddress(specialMarker.getLatLng());
  });
};

