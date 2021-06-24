const advTitleInput = document.querySelector('#title');
const advPriceInput = document.querySelector('#price');
const advRoomNumber = document.querySelector('#room_number');
const advCapacity = document.querySelector('#capacity');
const adForm = document.querySelector('.ad-form');
const adFormElements = Array.from(adForm.elements);
const submitButton = adForm.querySelector('.ad-form__submit');

const getInvalidElements = function (form) {
  return form.filter((element) => !element.validity.valid);
};

const getValidCapacity = function () {
  if (advRoomNumber.value === '100') {
    Array.from(advCapacity.options).forEach((option) => {
      option.value !== '0' ? option.disabled = true : option.disabled = false;
    });
  } else {
    Array.from(advCapacity.options).forEach((option) => {
      option.value > advRoomNumber.value || option.value === '0' ? option.disabled = true : option.disabled = false;
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

advTitleInput.addEventListener('input', () => {
  const valueLength = advTitleInput.value.length;
  if (valueLength < advTitleInput.minLength) {
    advTitleInput.setCustomValidity(`Введите ещё ${advTitleInput.minLength - valueLength} симв.`);
  } else if (valueLength > advTitleInput.maxLength) {
    advTitleInput.setCustomValidity(`Удалите лишние ${valueLength - advTitleInput.maxLength} симв.`);
  } else {
    advTitleInput.setCustomValidity('');
  }
  advTitleInput.reportValidity();
});

advPriceInput.addEventListener('input', () => {
  const priceValue = +advPriceInput.value;
  if (priceValue < +advPriceInput.min) {
    advPriceInput.setCustomValidity(`Цена не может быть меньше ${advPriceInput.min}`);
  } else if (priceValue > +advPriceInput.max) {
    advPriceInput.setCustomValidity(`Цена не может быть больше ${advPriceInput.max}`);
  } else {
    advPriceInput.setCustomValidity('');
  }
  advPriceInput.reportValidity();
});

advRoomNumber.addEventListener('change', () => {
  getValidCapacity();
  validateCapacity(advCapacity.selectedIndex);
});

advCapacity.addEventListener('click', getValidCapacity);

advCapacity.addEventListener('change', () => {
  advCapacity.classList.remove('invalid');
});

submitButton.addEventListener('click', (evt) => {
  getValidCapacity();
  validateCapacity(advCapacity.selectedIndex);
  if (getInvalidElements(adFormElements).length) {
    evt.preventDefault();
    getInvalidElements(adFormElements).forEach((element) => element.classList.add('invalid'));
  }
});

adForm.addEventListener('input', (evt) => {
  if (evt.target.validity.valid) {evt.target.classList.remove('invalid');}
});
