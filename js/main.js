import { getRandomNum, getRandomNumFloat, getAvatarImage, getParceArray, getRandomArrayElements } from './utils.js';
import { ADVENTS_COUNTS, TYPES, FEATURES_LIST, DESCRIPTIONS, BASEDIR, PHOTOS, adventTitle, minPrice, maxPrice, minRooms, maxRooms, minGuests, maxGuests, startTime, endTime, latMin, latMax, lngMin, lngMax, accu } from './data.js';

const Author = function () {
  this.avatar = getAvatarImage(ADVENTS_COUNTS);
};

const Location = function () {
  this.lat = getRandomNumFloat(latMin, latMax, accu);
  this.lng = getRandomNumFloat(lngMin, lngMax, accu);
};

const Offer = function () {
  this.title = adventTitle;
  this.price = getRandomNum(minPrice, maxPrice);
  this.type = getRandomArrayElements(TYPES);
  this.rooms = getRandomNum(minRooms, maxRooms);
  this.guests = getRandomNum(minGuests, maxGuests);
  this.checkin = `${getRandomNum(startTime, endTime)}:00`;
  this.checkout = `${getRandomNum(startTime, endTime)}:00`;
  this.features = getParceArray(FEATURES_LIST);
  this.description = getRandomArrayElements(DESCRIPTIONS);
  this.photos = getParceArray(PHOTOS).map((item) => `${BASEDIR}${item}`);
};

const Advent = function () {
  this.author = new Author();
  this.offer = new Offer();
  this.location = new Location();
  this.offer.addres = Object.values(this.location).join(', ');
};

// eslint-disable-next-line no-unused-vars
const advents = new Array(ADVENTS_COUNTS).fill(null).map(() => new Advent());
