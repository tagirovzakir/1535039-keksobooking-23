import { getRandomNum } from './utils.js';
import { changeFormsState } from './change-form-state.js';
import './validate-form.js';
import { mapCenter, ADVERTS_COUNTS, FILTER_DELAY } from './constants.js';
import { Map } from './map.js';
import { addressInputInitial, setSubmitCallback, setResetCallback, setCurrentAddress, showPreviewImage, removePreviews } from './form.js';
import { showAdvertsErrorMessage } from './show-adverts-error-message.js';
import { loadAdverts, sendForm } from './server-operations.js';
import { changeMessage } from './info-messages.js';
import { getFilteredAdverts, setChangeCallback } from './map-filters.js';
import { debounce } from './utils.js';

const allForms = document.forms;
const map = new Map('map-canvas', mapCenter);

changeFormsState();

map.setLoadCallback(() => {
  changeFormsState(false, allForms['ad-form']);
  addressInputInitial(mapCenter);
  showPreviewImage();
  loadAdverts()
    .then((ads) => {
      const firstElement = getRandomNum(0, ads.length - ADVERTS_COUNTS + 1);
      const result = ads.slice(firstElement, firstElement + ADVERTS_COUNTS);
      const delayedOnChange = debounce(() => {
        map.removeMarkers();
        const filteredAds = getFilteredAdverts(ads);
        filteredAds.splice(ADVERTS_COUNTS);
        map.addMarkers(filteredAds);
      }, FILTER_DELAY);
      setChangeCallback(delayedOnChange);
      changeFormsState(false, allForms['map-filters']);
      map.addMarkers(result);
      return (result);
    })
    .catch(() => {
      showAdvertsErrorMessage();
    })
    .then((result) => {
      map.setMoveCallback(setCurrentAddress);
      setResetCallback(() => {
        map.reset(result);
        allForms['map-filters'].reset();
        removePreviews();
      });
      setSubmitCallback(() => {
        sendForm(new FormData(allForms['ad-form']))
          .then(() => {
            changeMessage('success');
            map.reset(result);
            Array.from(allForms).forEach((form) => form.reset());
            removePreviews();
          })
          .catch(() => {
            changeMessage('error');
          });
      });
    });
});
