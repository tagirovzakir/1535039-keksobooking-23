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
const getAdvertFeaturesFragment = function (features) {
  const feturesFragment = document.createDocumentFragment();
  if (features) {
    features.forEach((feature) => {
      const fetureItem = document.createElement('li');
      fetureItem.classList.add('popup__feature', `popup__feature--${feature}`);
      feturesFragment.appendChild(fetureItem);
    });}
  return feturesFragment;
};
const getAdvertPhotosFragment = function (photos) {
  const photosFragment = document.createDocumentFragment();
  if (photos) {
    photos.forEach((photo) => {
      const image = document.createElement('img');
      image.src = photo;
      image.alt = 'Фотография жилья';
      image.width = 45;
      image.height = 40;
      image.classList.add('popup__photo');
      photosFragment.appendChild(image);
    });}
  return photosFragment;
};

export const createAdvertFragment = function (adInfo) {
  const advertElementFragment = document.createDocumentFragment();
  const advertElement = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  advertElement.querySelector('.popup__title').textContent = adInfo.offer.title;
  advertElement.querySelector('.popup__text--address').textContent = adInfo.offer.addres;
  advertElement.querySelector('.popup__text--price').textContent = `${adInfo.offer.price} ₽/ночь`;
  advertElement.querySelector('.popup__type').textContent = getAdvertType(adInfo.offer.type);
  advertElement.querySelector('.popup__text--capacity').textContent = `${adInfo.offer.rooms} ${getDeclensionRooms(adInfo.offer.rooms)} для ${adInfo.offer.guests} ${getDeclensionGuests(adInfo.offer.guests)}`;
  advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${adInfo.offer.checkin}, выезд до ${adInfo.offer.checkout}`;
  const featuresContainer = advertElement.querySelector('.popup__features');
  featuresContainer.innerHTML = '';
  featuresContainer.appendChild(getAdvertFeaturesFragment(adInfo.offer.features));
  advertElement.querySelector('.popup__description').textContent = adInfo.offer.description;
  const photosContainer = advertElement.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  photosContainer.appendChild(getAdvertPhotosFragment(adInfo.offer.photos));
  for (let index = 0; index < advertElement.children.length; index++) {
    if (!advertElement.children[index].innerHTML) {
      advertElement.children[index].remove();
    }
  }
  return advertElementFragment.appendChild(advertElement);
};
