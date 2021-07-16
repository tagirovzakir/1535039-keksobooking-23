import { getRandomNum } from './utils.js';
import { changeFormsState } from './change-form-state.js';
import './validate-form.js';
import { mapCenter, ADVERTS_COUNTS } from './constants.js';
import { Map } from './generate-map.js';
import { addressInputInitial, setSubmitCallback, setResetCallback, setCurrentAddress } from './form.js';
import { showAdvertsErrorMessage } from './show-adverts-error-message.js';
import { loadAdverts, sendForm } from './server-operations.js';
import { showMessage } from './info-message.js';
import { getFilteredAdverts, setChangeCallback } from './map-filters.js';
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
    .then((ads) => {
      const firstElement = getRandomNum(0, ads.length - ADVERTS_COUNTS + 1);
      const result = ads.slice(firstElement, firstElement + ADVERTS_COUNTS);
      const delayedOnChange = debounce(() => {
        map.removeMarkers();
        const filteredAds = getFilteredAdverts(ads);
        filteredAds.splice(ADVERTS_COUNTS);
        map.addMarkers(filteredAds);
      });
      setChangeCallback(delayedOnChange);
      changeFormsState(false, [document.forms['map-filters']]);
      map.addMarkers(result);
      map.setMoveCallback(setCurrentAddress);
      setResetCallback(() => {
        map.reset();
        map.addMarkers(result);
        document.forms['map-filters'].reset();
      });
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


