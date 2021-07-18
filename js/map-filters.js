const advFilter = document.forms['map-filters'];

const filterByType = function (adv) {
  return advFilter['housing-type'].value === 'any' || advFilter['housing-type'].value === adv.offer.type;
};
const filterByRooms = function (adv) {
  return advFilter['housing-rooms'].value === 'any' || +advFilter['housing-rooms'].value === adv.offer.rooms;
};
const filterByGuests = function (adv) {
  return advFilter['housing-guests'].value === 'any' || +advFilter['housing-guests'].value === adv.offer.guests;
};
const filterByPrice = function (adv) {
  if (advFilter['housing-price'].value === 'any') {
    return true;
  } else {
    switch (advFilter['housing-price'].value) {
      case 'low':
        if (adv.offer.price <= 10000) {
          return true;
        }
        break;
      case 'middle':
        if (adv.offer.price >= 10000 && adv.offer.price <= 50000) {
          return true;
        }
        break;
      case 'high':
        if (adv.offer.price >= 50000) {
          return true;
        }
        break;
    }
  }
};
const filterByFeatures = function (chosen, features = []) {
  return !chosen.length || chosen.every((feature) => features.includes(feature));
};

export const setChangeCallback = function (callback) {
  advFilter.addEventListener('change', callback);
};

export const getFilteredAdverts = function (adverts) {
  const chosenFeatures = new FormData(advFilter).getAll('features');
  const filteredAdverts =  adverts.filter((adv) => filterByType(adv) && filterByRooms(adv) && filterByGuests(adv) && filterByPrice(adv) && filterByFeatures(chosenFeatures, adv.offer.features));
  return filteredAdverts;
};
