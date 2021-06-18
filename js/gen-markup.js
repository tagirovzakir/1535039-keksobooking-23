import { advents } from './data.js';

const map = document.querySelector('#map-canvas');
const adventListTemplate = document.querySelector('#card').content.querySelector('.popup');
const adventList = advents;
const adventListFragment = document.createDocumentFragment();

const getAdventType = function (type) {
  switch (type) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalow':
      return 'Бунгало';
    case 'hotel':
      return 'Отель';
  }
};
const getDeclensionRooms = function (rooms) {
  if (rooms > 4) {
    return 'комнат';
  } else if (rooms > 1) {
    return 'комнаты';
  } else {
    return 'комната';
  }
};
const getDeclensionGuests = function (guests) {
  return guests === 1 ? 'гостя' : 'гостей';
};
const getAdventPhotos = function (photos, image) {
  const adventImagesFragment = document.createDocumentFragment();
  for (let index = 0; index < photos.length; index++) {
    let adventImage = document.createElement('img');
    adventImage = image.cloneNode(true);
    adventImage.src = photos[index];
    adventImagesFragment.appendChild(adventImage);
  }
  return adventImagesFragment;
};
const removeEmptyElem = function (elem) {
  if (elem.children.length === 0) { elem.remove(); }
};

adventList.forEach((elem) => {
  const advent = adventListTemplate.cloneNode(true);
  const adventImage = advent.querySelector('.popup__photos').querySelector('.popup__photo').cloneNode();
  advent.querySelector('.popup__title').textContent = elem.offer.title;
  advent.querySelector('.popup__text--address').textContent = elem.offer.addres;
  advent.querySelector('.popup__text--price').textContent = `${elem.offer.price} ₽/ночь`;
  advent.querySelector('.popup__type').textContent = getAdventType(elem.offer.type);
  advent.querySelector('.popup__text--capacity').textContent = `${elem.offer.rooms} ${getDeclensionRooms(elem.offer.rooms)} для ${elem.offer.guests} ${getDeclensionGuests(elem.offer.guests)}`;
  advent.querySelector('.popup__text--time').textContent = `Заезд после ${elem.offer.checkin}, выезд до ${elem.offer.checkout}`;
  advent.querySelector('.popup__features').querySelectorAll('.popup__feature').forEach((item) => {
    const itHas = elem.offer.features.some((feature) => item.classList[1].includes(feature));
    if (!itHas) {item.remove();}
  });
  removeEmptyElem(advent.querySelector('.popup__features'));
  advent.querySelector('.popup__description').textContent = elem.offer.description;
  advent.querySelector('.popup__photos').querySelector('.popup__photo').remove();
  advent.querySelector('.popup__photos').appendChild(getAdventPhotos(elem.offer.photos, adventImage));
  removeEmptyElem(advent.querySelector('.popup__photos'));
  for (let index = 0; index < advent.children.length; index++) {
    if (!advent.children[index].textContent) {
      advent.children[index].remove();
    }
  }
  adventListFragment.appendChild(advent);
});

map.appendChild(adventListFragment);
