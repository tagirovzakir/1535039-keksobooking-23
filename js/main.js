import { adverts } from './data.js';
import { changeFormsState } from './change-form-state.js';
import './validate-form.js';
import { mapCenter } from './map-center.js';
import { Map } from './generate-map.js';
import { addressInputInitial, setResetCallback, setCurrentAddress } from './form.js';

changeFormsState(true);

const map = new Map('map-canvas', mapCenter);

map.setLoadCallback(() => {
  map.addMarkers(adverts);
  addressInputInitial(mapCenter);
  changeFormsState(false);
});

map.setMoveCallback(setCurrentAddress);
setResetCallback(() => { map.reset(); });
