import { createAdvert } from './create-advert.js';
import { adverts } from './data.js';

const map = document.querySelector('#map-canvas');

map.appendChild(createAdvert(adverts[0]));
