import { getInvalidElements } from './utils.js';

const adForm = document.querySelector('.ad-form');
const advTitleInput = adForm.querySelector('#title');
const advPriceInput = adForm.querySelector('#price');
const advRoomNumber = adForm.querySelector('#room_number');
const advCapacity = adForm.querySelector('#capacity');
const submitButton = adForm.querySelector('.ad-form__submit');
const adFormElements = Array.from(adForm.elements);

const disableInvalidOptions = function () {
  if (advRoomNumber.value === '100') {
    Array.from(advCapacity.options).forEach((option) => {
      option.disabled = option.value !== '0';
    });
  } else {
    Array.from(advCapacity.options).forEach((option) => {
      option.disabled = option.value > advRoomNumber.value || option.value === '0';
    });
  }
};

const validateCapacity = function (index) {
  if (advCapacity[index].disabled && advCapacity[index].selected) {
    advCapacity.setCustomValidity('Выберите корректное количество гостей');
  } else {
    advCapacity.setCustomValidity('');
  }
  advCapacity.reportValidity();
};

window.addEventListener('load', disableInvalidOptions);

advTitleInput.addEventListener('input', () => {
  // const valueLength = advTitleInput.value.length;
  // if (valueLength < advTitleInput.minLength) {
  //   advTitleInput.setCustomValidity(`Введите ещё ${advTitleInput.minLength - valueLength} симв.`);
  // } else if (valueLength > advTitleInput.maxLength) {
  //   advTitleInput.setCustomValidity(`Удалите лишние ${valueLength - advTitleInput.maxLength} симв.`);
  // } else {
  //   advTitleInput.setCustomValidity('');
  // }
  advTitleInput.reportValidity();
});

advPriceInput.addEventListener('input', () => {
  // const priceValue = +advPriceInput.value;
  // if (priceValue < +advPriceInput.min) {
  //   advPriceInput.setCustomValidity(`Цена не может быть меньше ${advPriceInput.min}`);
  // } else if (priceValue > +advPriceInput.max) {
  //   advPriceInput.setCustomValidity(`Цена не может быть больше ${advPriceInput.max}`);
  // } else {
  //   advPriceInput.setCustomValidity('');
  // }
  advPriceInput.reportValidity();
});

advRoomNumber.addEventListener('change', () => {
  disableInvalidOptions();
  validateCapacity(advCapacity.selectedIndex);
});

advCapacity.addEventListener('change', () => {
  advCapacity.classList.remove('invalid');
});

submitButton.addEventListener('click', (evt) => {
  disableInvalidOptions();
  validateCapacity(advCapacity.selectedIndex);
  advPriceInput.reportValidity();
  advTitleInput.reportValidity();
  if (getInvalidElements(adFormElements).length) {
    evt.preventDefault();
    getInvalidElements(adFormElements).forEach((element) => element.classList.add('invalid'));
  }
});

adForm.addEventListener('input', (evt) => {
  if (evt.target.validity.valid) {evt.target.classList.remove('invalid');}
});
