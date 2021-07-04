const addressInput = document.forms['ad-form'].querySelector('#address');
const resetButton = document.forms['ad-form'].querySelector('.ad-form__reset');


export const addressInputInitial = function (center) {
  addressInput.defaultValue = center;
  addressInput.readOnly = true;
  addressInput.value = center;
};

export const setResetCallback = function (callback) {
  resetButton.addEventListener('click', () => {
    callback();
  });
};

export const setCurrentAddress = function (lat, lng) {
  addressInput.value = `${lat}, ${lng}`;
};

