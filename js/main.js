import { getRandomNum } from './utils.js';
import { changeFormsState } from './change-form-state.js';
import './validate-form.js';
import { mapCenter, ADVERTS_COUNTS, DELAY } from './constants.js';
import { Map } from './generate-map.js';
import { addressInputInitial, setSubmitCallback, setResetCallback, setCurrentAddress } from './form.js';
import { showAdvertsErrorMessage } from './show-adverts-error-message.js';
import { loadAdverts, sendForm } from './server-operations.js';
import { showMessage } from './info-message.js';
import { mapFilters } from './map-filters.js';
import { debounce } from './utils.js';

const mapContainer = document.querySelector('#map-canvas');
const map = new Map('map-canvas', mapCenter);
const allForms = Array.from(document.forms);

changeFormsState(true, allForms);

map.setLoadCallback(() => {
  changeFormsState(false, [document.forms['ad-form']]);
  addressInputInitial(mapCenter);
  const loadAdvertsPromise = loadAdverts();
  loadAdvertsPromise
    .then((json) => {
      const firstElement = getRandomNum(0, json.length - ADVERTS_COUNTS + 1);
      const result = json.slice(firstElement, firstElement + ADVERTS_COUNTS);
      document.forms['map-filters'].addEventListener('change', debounce(() => {
        map.removeMarkers();
        const filtered = mapFilters(json);
        filtered.splice(ADVERTS_COUNTS);
        map.addMarkers(filtered);
      }, DELAY),
      );
      changeFormsState(false, [document.forms['map-filters']]);
      map.addMarkers(result);
      map.setMoveCallback(setCurrentAddress);
      setResetCallback(
        () => { map.reset(); },
        () => { map.addMarkers(result); },
        () => { document.forms['map-filters'].reset(); },
      );
      setSubmitCallback(() => {
        sendForm(new FormData(document.forms['ad-form']))
          .then(() => {
            showMessage('success');
            document.forms['ad-form'].reset();
            map.reset();
            map.addMarkers(result);
          })
          .catch(() => {
            showMessage('error');
          });
      });
    })
    .catch(() => {
      showAdvertsErrorMessage(mapContainer);
    });
});


