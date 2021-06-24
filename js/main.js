import { createAdvert } from './create-advert.js';
import { adverts } from './data.js';
import { changeFormsState } from './change-form-state.js';
import './validate-form.js';

const map = document.querySelector('#map-canvas');
const allForms = document.querySelectorAll('form');

map.appendChild(createAdvert(adverts[0]));
changeFormsState(allForms, false);
