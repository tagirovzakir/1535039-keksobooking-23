const getRandomNum = function (first, second) {
  if (!Number.isFinite(first) || !Number.isFinite(second)) {
    throw new Error('Одно или оба значения не являются конечным числом');
  }
  const [min, max] = Math.abs(first) > Math.abs(second) ?
    [Math.ceil(Math.abs(second)), Math.floor(Math.abs(first))] :
    [Math.ceil(Math.abs(first)), Math.floor(Math.abs(second))];
  return Math.floor((Math.random() * (max - min + 1)) + min);
};

const getRandomNumFloat = function (first, second, parce = 0) {
  if (!Number.isFinite(first) || !Number.isFinite(second) || !Number.isFinite(parce)) {
    throw new Error('одно или оба значения не являются конечным числом');
  }
  parce = Math.floor(parce);
  const [min, max] = Math.abs(first) > Math.abs(second) ?
    [Math.abs(second), Math.abs(first)] :
    [Math.abs(first), Math.abs(second)];
  const result = Math.random() * (max - min) + min;
  return Number(result.toFixed(parce));
};

const ADVENTS_COUNTS = 10;
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTIONS = [
  'Отличное жилище',
  'Неплохое помещение',
  'Хорошее место для ночлега',
];
const BASEDIR = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/';
const PHOTOS = [
  'duonguyen-8LrGtIxxa4w.jpg',
  'brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'claire-rendall-b6kAwr1i0Iw.jpg',
];

const avatars = new Array(ADVENTS_COUNTS).fill(0).map((photo, index) => {
  photo = index + 1;
  if (photo < 10) {return `0${photo}`;}
  return `${photo}`;
});

const getAvatarImage = function () {
  if (!avatars.length) {return 'img/avatars/user00.png';}
  const avatarNumber = avatars.splice(getRandomNum(0, avatars.length - 1), 1);
  return `img/avatars/user${avatarNumber}.png`;
};

const adventTitle = 'Объявление';

const [minPrice, maxPrice] = [1, 50000];

const [minRooms, maxRooms] = [1, 10];

const [minGuests, maxGuests] = [1, 10];

const [startTime, endTime] = [12, 14];

const [latMin, latMax, lngMin, lngMax, accu] = [35.65000, 35.70000, 139.70000, 139.80000, 6];

const getParceArray = function (array) {
  const parceArray = [];
  for (const item of array) {
    const itHas = getRandomNum(+false, +true);
    if (itHas) {
      parceArray.push(item);
    }
  }
  return parceArray;
};

const getRandomArrayElements = function (array) {
  return array[getRandomNum(0, array.length - 1)];
};

const getCoords = function (minCoords, maxCoords, digits) {
  return getRandomNumFloat(minCoords, maxCoords, digits);
};

const Author = function () {
  this.avatar = getAvatarImage();
};

const Location = function () {
  this.lat = getCoords(latMin, latMax, accu);
  this.lng = getCoords(lngMin, lngMax, accu);
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
