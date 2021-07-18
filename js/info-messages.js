import { isEscEvent } from './utils.js';

const mapContainer = document.querySelector('#map-canvas');

export const showAdvertsErrorMessage = function () {
  const advertsErrorMessage = document.querySelector('#adv-error').content.querySelector('.adv-error').cloneNode(true);
  mapContainer.appendChild(advertsErrorMessage);
};

const appendInfoMessage = function (name) {
  const infoMessage = document.querySelector(`#${name}`).content.querySelector('div').cloneNode(true);
  document.body.appendChild(infoMessage);
};

const closeMessage = function (message) {
  message.remove();
  document.body.style.overflow = '';
};

const setClosingMethods = function (message, name) {
  const onEscKeyDown = function (evt) {
    evt.preventDefault();
    if (isEscEvent(evt)) {
      closeMessage(message);
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };
  const closeOnClick = function () {
    message.addEventListener('click', () => {
      closeMessage(message);
      document.removeEventListener('keydown', onEscKeyDown);
    });
  };
  const closeOnButton = function () {
    const closeButton = message.querySelector('.error__button');
    closeButton.addEventListener('click', () => {
      closeMessage(message);
      document.removeEventListener('keydown', onEscKeyDown);
    });
  };

  document.addEventListener('keydown', onEscKeyDown);
  closeOnClick();
  if (name === 'error') {
    closeOnButton();
  }
};

export const changeMessage = function (name) {
  document.body.style.overflow = 'hidden';
  appendInfoMessage(name);
  const resultMessage = document.querySelector(`.${name}`);
  setClosingMethods(resultMessage, name);
};

