const addressInput = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');

addressInput.defaultValue = addressInput.dataset.centerCoords;

export const addressInputInitial = function (center) {
  addressInput.readOnly = true;
  addressInput.value = center;
};

export const setResetCallback = function (callback) {
  resetButton.addEventListener('click', () => {
    callback();
  });
};

export const getCurrentAddress = function (coords) {
  addressInput.value = `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`;
};

