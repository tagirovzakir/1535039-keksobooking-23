export const getRandomNum = function (first, second) {
  if (!Number.isFinite(first) || !Number.isFinite(second)) {
    throw new Error('Одно или оба значения не являются конечным числом');
  }
  const [min, max] = Math.abs(first) > Math.abs(second) ?
    [Math.ceil(Math.abs(second)), Math.floor(Math.abs(first))] :
    [Math.ceil(Math.abs(first)), Math.floor(Math.abs(second))];
  return Math.floor((Math.random() * (max - min + 1)) + min);
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

export const debounce = function (callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
