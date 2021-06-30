import { createAdvert } from './create-advert.js';
import { adverts } from './data.js';
import { changeFormsState } from './change-form-state.js';
import './validate-form.js';
import { createMap, createSpecialMarker, createCommonMarker } from './generate-map.js';

const allForms = document.querySelectorAll('form');
const addressInput = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
const centerCoords = addressInput.dataset.centerCoords.split(',');

changeFormsState(allForms, true);
addressInput.readOnly = true;

const map = createMap('map-canvas', changeFormsState(allForms, false), centerCoords);
const markersLayer = L.layerGroup().addTo(map);
const specialMarker = createSpecialMarker(centerCoords);
specialMarker.addTo(map);
adverts.forEach((advert) => {
  createCommonMarker(advert.location).addTo(markersLayer).bindPopup(createAdvert(advert));
});
addressInput.value = centerCoords;

specialMarker.on('moveend', (evt) => {
  const currentCoords = [evt.target.getLatLng().lat.toFixed(5), evt.target.getLatLng().lng.toFixed(5)];
  addressInput.value = currentCoords.join(', ');
});

resetButton.form.addEventListener('reset', () => {
  map.setView(centerCoords, 13);
  specialMarker.setLatLng(centerCoords);
});
