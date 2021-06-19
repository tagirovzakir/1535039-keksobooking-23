const mapType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const getAdvertType = function (type) {
  return mapType[type];
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
const getAdvertFeatures = function (featuresListElement, features) {
  if (features.length === 0) {
    featuresListElement.remove();
    return;
  }
  featuresListElement.innerHTML = '';
  features.forEach((feature) => {
    const fetureItem = document.createElement('li');
    fetureItem.classList.add('popup__feature', `popup__feature--${feature}`);
    featuresListElement.appendChild(fetureItem);
  });
};
const getAdvertPhotos = function (photosListElement, photos) {
  if (photos.length === 0) {
    photosListElement.remove();
    return;
  }
  const advertImage = photosListElement.querySelector('.popup__photo').cloneNode();
  for (let index = 0; index < photos.length; index++) {
    const image = advertImage.cloneNode();
    image.src = photos[index];
    photosListElement.appendChild(image);
  }
  photosListElement.children[0].remove();
};

export const createAdvert = function (advObj) {
  const advertElementFragment = document.createDocumentFragment();
  const advertElement = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  advertElement.querySelector('.popup__title').textContent = advObj.offer.title;
  advertElement.querySelector('.popup__text--address').textContent = advObj.offer.addres;
  advertElement.querySelector('.popup__text--price').textContent = `${advObj.offer.price} ₽/ночь`;
  advertElement.querySelector('.popup__type').textContent = getAdvertType(advObj.offer.type);
  advertElement.querySelector('.popup__text--capacity').textContent = `${advObj.offer.rooms} ${getDeclensionRooms(advObj.offer.rooms)} для ${advObj.offer.guests} ${getDeclensionGuests(advObj.offer.guests)}`;
  advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${advObj.offer.checkin}, выезд до ${advObj.offer.checkout}`;
  getAdvertFeatures(advertElement.querySelector('.popup__features'), advObj.offer.features);

  advertElement.querySelector('.popup__description').textContent = advObj.offer.description;
  getAdvertPhotos(advertElement.querySelector('.popup__photos'), advObj.offer.photos);
  for (let index = 0; index < advertElement.children.length; index++) {
    if (!advertElement.children[index].textContent && advertElement.children[index].length === 0) {
      advertElement.children[index].remove();
    }
  }
  return advertElementFragment.appendChild(advertElement);
};
