import { getInvalidElements } from './utils.js';

const adForm = document.querySelector('.ad-form');
const advRoomNumber = adForm.querySelector('#room_number');
const advCapacity = adForm.querySelector('#capacity');
const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = adForm.querySelector('.ad-form__reset');
const guestRestrictions = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const disableInvalidOptions = function () {
  const availableValues = guestRestrictions[+advRoomNumber.value];
  Array.from(advCapacity.options).forEach((option) => {
    const disabled = !availableValues.includes(+option.value);
    option.disabled = disabled;
  });
};

const validateCapacity = function () {
  const availableValues = guestRestrictions[+advRoomNumber.value];
  if (!availableValues.includes(+advCapacity.value)) {
    advCapacity.setCustomValidity('Выберите корректное количество гостей');
  } else {
    advCapacity.setCustomValidity('');
  }
};

window.addEventListener('load', () => {
  disableInvalidOptions();
  validateCapacity();
});

advRoomNumber.addEventListener('change', () => {
  disableInvalidOptions();
  validateCapacity();
  advCapacity.reportValidity();
});

advCapacity.addEventListener('change', () => {
  validateCapacity();
  advCapacity.classList.remove('invalid');
});

submitButton.addEventListener('click', () => {
  getInvalidElements(adForm).forEach((element) => element.classList.add('invalid'));
});

resetButton.addEventListener('click', () => {
  getInvalidElements(adForm).forEach((element) => element.classList.remove('invalid'));
});

adForm.addEventListener('input', (evt) => {
  if (evt.target.validity.valid) { evt.target.classList.remove('invalid'); }
  if (evt.target.required) { evt.target.reportValidity(); }
});
