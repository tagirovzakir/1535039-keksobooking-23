import { getInvalidElements, removeInvalidClass } from './utils.js';

const adForm = document.querySelector('.ad-form');
const typeHousing = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const timeSelect = adForm.querySelector('.ad-form__element--time');
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
const priceRestrictions = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const initialPriceInput = function () {
  const minimalPrice = priceRestrictions[typeHousing.value];
  priceInput.min = minimalPrice;
  priceInput.placeholder = minimalPrice;
};
const validatePrice = function () {
  const availableValue = +priceRestrictions[typeHousing.value];
  if (+priceInput.value < availableValue || +priceInput.value > priceInput.max) {
    priceInput.setCustomValidity(`Цена должна быть от ${availableValue} до ${priceInput.max}`);
  } else {
    priceInput.setCustomValidity('');
  }
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
  initialPriceInput();
  disableInvalidOptions();
  validateCapacity();
});

typeHousing.addEventListener('change', () => {
  initialPriceInput();
  validatePrice();
  priceInput.reportValidity();
  removeInvalidClass(priceInput);
});
priceInput.addEventListener('input', () => {
  validatePrice();
});

timeSelect.addEventListener('change', (evt) => {
  if (evt.target.matches('#timein')) {
    timeSelect.querySelector('#timeout').value = evt.target.value;
  } else {
    timeSelect.querySelector('#timein').value = evt.target.value;
  }
});

advRoomNumber.addEventListener('change', () => {
  disableInvalidOptions();
  validateCapacity();
  advCapacity.reportValidity();
  removeInvalidClass(advCapacity);
});
advCapacity.addEventListener('change', () => {
  validateCapacity();
  removeInvalidClass(advCapacity);
});

submitButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  getInvalidElements(adForm).forEach((element) => element.classList.add('invalid'));
  validateCapacity();
});

resetButton.addEventListener('click', () => {
  getInvalidElements(adForm).forEach((element) => element.classList.remove('invalid'));
});

adForm.addEventListener('input', (evt) => {
  removeInvalidClass(evt.target);
  if (evt.target.required) { evt.target.reportValidity(); }
});
