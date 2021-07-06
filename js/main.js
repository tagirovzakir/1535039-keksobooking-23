// import { adverts } from './data.js';
import { changeFormsState } from './change-form-state.js';
import './validate-form.js';
import { mapCenter, ADVERTS_COUNTS } from './constants.js';
import { Map } from './generate-map.js';
import { addressInputInitial, setResetCallback, setCurrentAddress } from './form.js';
import { loadAdverts } from './load-adverts.js';
import { showAdvertsErrorMessage } from './show-adverts-error-message.js';
import { createInfoMessage } from './info-message.js';

const mapContainer = document.querySelector('#map-canvas');
const map = new Map('map-canvas', mapCenter);
const allForms = Array.from(document.forms);
const success = document.querySelector('#success');
const error = document.querySelector('#error');

changeFormsState(true, allForms);
createInfoMessage([success, error]);

map.setLoadCallback(() => {
  changeFormsState(false, [document.forms['ad-form']]);
  addressInputInitial(mapCenter);
  loadAdverts(ADVERTS_COUNTS)
    .then((result) => {
      map.addMarkers(result);
    })
    .then(() => {
      changeFormsState(false, [document.forms['map-filters']]);
    })
    .catch(() => {
      showAdvertsErrorMessage(mapContainer);
    });
});

map.setMoveCallback(setCurrentAddress);
setResetCallback(() => { map.reset(); });

