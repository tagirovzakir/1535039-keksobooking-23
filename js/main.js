import { adverts } from './data.js';
import { changeFormsState } from './change-form-state.js';
import './validate-form.js';
import { createMap, appendMarkers, resetMap, getCurrentCoords } from './generate-map.js';
import { addressInputInitial, setResetCallback } from './form.js';

const centerCoords = document.querySelector('#address').dataset.centerCoords.split(',');

changeFormsState(true);

const myMap = createMap('map-canvas', centerCoords, () => { changeFormsState(false); });
myMap.whenReady(() => {
  appendMarkers(myMap, adverts);
  addressInputInitial(centerCoords);
});

getCurrentCoords();

setResetCallback(() => {resetMap(myMap, centerCoords);});

