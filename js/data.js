import { getRandomNum, getRandomNumFloat, getParceArray, getRandomArrayElements } from './utils.js';

const ADVENTS_COUNTS = 10,
  TYPES = [
    'palace',
    'flat',
    'house',
    'bungalow',
    'hotel',
  ],
  FEATURES_LIST = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ],
  DESCRIPTIONS = [
    'Отличное жилище',
    'Неплохое помещение',
    'Хорошее место для ночлега',
  ],
  BASEDIR = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/',
  PHOTOS = [
    'duonguyen-8LrGtIxxa4w.jpg',
    'brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'claire-rendall-b6kAwr1i0Iw.jpg',
  ];
const advertTitle = 'Объявление',
  [minPrice, maxPrice] = [1, 50000],
  [minRooms, maxRooms] = [1, 10],
  [minGuests, maxGuests] = [1, 10],
  [startTime, endTime] = [12, 14],
  [latMin, latMax, lngMin, lngMax, accu] = [35.65000, 35.70000, 139.70000, 139.80000, 6];

const getAvatarImage = function (length) {
  const avatars = new Array(length).fill(0).map((photo, index) => {
    photo = `${index + 1}`;
    if (photo.length === 1) {
      return `0${photo}`;
    }
    return photo;
  });
  if (!avatars.length) {return 'img/avatars/user00.png';}
  const avatarNumber = avatars.splice(getRandomNum(0, avatars.length - 1), 1);
  return `img/avatars/user${avatarNumber}.png`;
};

const Author = function () {
  this.avatar = getAvatarImage(ADVENTS_COUNTS);
};

const Location = function () {
  this.lat = getRandomNumFloat(latMin, latMax, accu);
  this.lng = getRandomNumFloat(lngMin, lngMax, accu);
};

const Offer = function () {
  this.title = advertTitle;
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

const Advert = function () {
  this.author = new Author();
  this.offer = new Offer();
  this.location = new Location();
  this.offer.addres = Object.values(this.location).join(', ');
};

// eslint-disable-next-line no-unused-vars
export const adverts = new Array(ADVENTS_COUNTS).fill(null).map(() => new Advert());
