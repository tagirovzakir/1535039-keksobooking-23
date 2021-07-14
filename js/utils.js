export const getRandomNum = function (first, second) {
  if (!Number.isFinite(first) || !Number.isFinite(second)) {
    throw new Error('Одно или оба значения не являются конечным числом');
  }
  const [min, max] = Math.abs(first) > Math.abs(second) ?
    [Math.ceil(Math.abs(second)), Math.floor(Math.abs(first))] :
    [Math.ceil(Math.abs(first)), Math.floor(Math.abs(second))];
  return Math.floor((Math.random() * (max - min + 1)) + min);
};

export const getRandomNumFloat = function (first, second, parce = 0) {
  if (!Number.isFinite(first) || !Number.isFinite(second) || !Number.isFinite(parce)) {
    throw new Error('одно или оба значения не являются конечным числом');
  }
  parce = Math.floor(parce);
  const [min, max] = Math.abs(first) > Math.abs(second) ?
    [Math.abs(second), Math.abs(first)] :
    [Math.abs(first), Math.abs(second)];
  const result = Math.random() * (max - min) + min;
  return Number(result.toFixed(parce));
};

export const getParceArray = function (array) {
  const parceArray = [];
  for (const item of array) {
    if (getRandomNum(+false, +true)) {
      parceArray.push(item);
    }
  }
  return parceArray;
};

export const getRandomArrayElements = function (array) {
  return array[getRandomNum(0, array.length - 1)];
};

export const getInvalidElements = function (form) {
  return Array.from(form.elements).filter((element) => !element.validity.valid);
};

export const removeInvalidClass = function (formElement) {
  if (formElement.validity.valid) { formElement.classList.remove('invalid'); }
};

export const isEscEvent = function (evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

export const debounce = function (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
