import { getRandomNum } from './utils.js';
import { changeFormsState } from './change-form-state.js';
import './validate-form.js';
import { mapCenter, ADVERTS_COUNTS } from './constants.js';
import { Map } from './generate-map.js';
import { addressInputInitial, setSubmitCallback, setResetCallback, setCurrentAddress } from './form.js';
import { showAdvertsErrorMessage } from './show-adverts-error-message.js';
import { loadAdverts, sendForm } from './server-operations.js';
import { showMessage } from './info-message.js';

const mapContainer = document.querySelector('#map-canvas');
const map = new Map('map-canvas', mapCenter);
const allForms = Array.from(document.forms);

changeFormsState(true, allForms);

map.setLoadCallback(() => {
  changeFormsState(false, [document.forms['ad-form']]);
  addressInputInitial(mapCenter);
  loadAdverts()
    .then((json) => {
      const firstElement = getRandomNum(0, json.length - ADVERTS_COUNTS + 1);
      return json.slice(firstElement, firstElement + ADVERTS_COUNTS);
    })
    .then((result) => {
      changeFormsState(false, [document.forms['map-filters']]);
      map.addMarkers(result);
    })
    .catch(() => {
      showAdvertsErrorMessage(mapContainer);
    });
});

map.setMoveCallback(setCurrentAddress);
setSubmitCallback(() => {
  sendForm(new FormData(document.forms['ad-form']))
    .then(() => {
      showMessage('success');
      document.forms['ad-form'].reset();
    })
    .catch(() => {
      showMessage('error');
    });
});
setResetCallback(
  () => { map.reset(); },
  () => { document.forms['map-filters'].reset(); },
);

