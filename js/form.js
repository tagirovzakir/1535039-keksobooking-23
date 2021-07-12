const addressInput = document.forms['ad-form'].querySelector('#address');
const resetButton = document.forms['ad-form'].querySelector('.ad-form__reset');
const submitButton = document.forms['ad-form'].querySelector('.ad-form__submit');


export const addressInputInitial = function (center) {
  addressInput.defaultValue = center;
  addressInput.readOnly = true;
  addressInput.value = center;
};

export const setSubmitCallback = function (callback) {
  submitButton.addEventListener('click', () => {
    if (submitButton.form.checkValidity()) { callback(); }
  });
};

export const setResetCallback = function (...callbacks) {
  resetButton.addEventListener('click', () => {
    callbacks.forEach((callback) => callback());
  });
};

export const setCurrentAddress = function (lat, lng) {
  addressInput.value = `${lat}, ${lng}`;
};
