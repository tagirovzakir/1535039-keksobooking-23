const mapContainer = document.querySelector('#map-canvas');

export const showAdvertsErrorMessage = function () {
  const advertsErrorMessage = document.querySelector('#adv-error').content.querySelector('.adv-error').cloneNode(true);
  mapContainer.appendChild(advertsErrorMessage);
};


