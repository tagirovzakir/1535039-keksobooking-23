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
  if (!Number.isFinite(first) || !Number.isFinite(second) || second < 0 || !Number.isFinite(parce)) {
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
const CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUTS = CHECKINS;
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
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assetshtmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
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

const [minPhotos, maxPhotos] = [1, 10];

const lats = [
  35.65000,
  35.70000,
];

const lngs = [
  139.70000,
  139.80000,
];

const getFeatures = function (array) {
  const features = [];
  for (const feature of array) {
    const itHas = getRandomNum(+false, +true);
    if (itHas) {
      features.push(feature);
    }
  }
  return features;
};

const getRandomArrayElements = function (array) {
  return array[getRandomNum(0, array.length - 1)];
};

const getAnyElements = function (array, min, max) {
  return new Array(getRandomNum(min, max)).fill(null).map(() => getRandomArrayElements(array));
};

const getCoords = function (line) {
  return getRandomNumFloat(line[0], line[1], 6);
};

const GenerateAuthor = function () {
  this.avatar = getAvatarImage();
};

const GenerateLocation = function () {
  this.lat = getCoords(lats);
  this.lng = getCoords(lngs);
};

const GenerateOffer = function () {
  this.title = adventTitle;
  this.price = getRandomNum(minPrice, maxPrice);
  this.type = getRandomArrayElements(TYPES);
  this.rooms = getRandomNum(minRooms, maxRooms);
  this.guests = getRandomNum(minGuests, maxGuests);
  this.checkin = getRandomArrayElements(CHECKINS);
  this.checkout = getRandomArrayElements(CHECKOUTS);
  this.features = getFeatures(FEATURES_LIST);
  this.description = getRandomArrayElements(DESCRIPTIONS);
  this.photos = getAnyElements(PHOTOS, minPhotos, maxPhotos);
};

const GenerateAdvent = function () {
  this.author = new GenerateAuthor();
  this.offer = new GenerateOffer();
  this.location = new GenerateLocation();
  this.GenerateAddres = function () {
    this.offer.addres = Object.values(this.location).join(', ');
  };
};

// eslint-disable-next-line no-unused-vars
const advents = new Array(ADVENTS_COUNTS).fill(null).map(() => {
  const advent = new GenerateAdvent();
  advent.GenerateAddres();
  return advent;
});
