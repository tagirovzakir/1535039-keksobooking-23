const advFilter = document.forms['map-filters'];

export const mapFilters = function (adverts) {
  const filtered = [];
  const choosedFeatures = new FormData(advFilter).getAll('features');
  adverts.forEach((adv) => {
    adv.points = 0;
    adv.featuresMatches = false;
    if (advFilter['housing-type'].value === 'any' || advFilter['housing-type'].value === adv.offer.type) {
      adv.points += 1;
    }
    if (advFilter['housing-price'].value === 'any') {
      adv.points += 1;
    } else {
      switch (advFilter['housing-price'].value) {
        case 'low':
          if (adv.offer.price <= 10000) {
            adv.points += 1;
          }
          break;
        case 'middle':
          if (adv.offer.price >= 10000 && adv.offer.price <= 50000) {
            adv.points += 1;
          }
          break;
        case 'high':
          if (adv.offer.price >= 50000) {
            adv.points += 1;
          }
          break;
      }
    }
    if (advFilter['housing-rooms'].value === 'any' || +advFilter['housing-rooms'].value === adv.offer.rooms) {
      adv.points += 1;
    }
    if (advFilter['housing-guests'].value === 'any' || +advFilter['housing-guests'].value === adv.offer.guests) {
      adv.points += 1;
    }
    if (choosedFeatures.length === 0) {
      adv.points += 1;
    } else if (adv.offer.features) {
      if (choosedFeatures.every((feature) => adv.offer.features.includes(feature))) {
        adv.points += 1;
      }
    }

    if (adv.points === 5) {
      filtered.push(adv);
    }
  });
  return filtered;
};


