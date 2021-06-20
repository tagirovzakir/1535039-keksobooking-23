import { createAdvert } from './create-advert.js';
import { adverts } from './data.js';
import { deactivateForms, activateForms } from './form.js';

const map = document.querySelector('#map-canvas');
const allForms = document.querySelectorAll('form');

map.appendChild(createAdvert(adverts[0]));
deactivateForms(allForms);
activateForms(allForms);
