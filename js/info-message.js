import { isEscEvent } from './utils.js';

const appendInfoMessage = function (name) {
  const infoMessage = document.querySelector(`#${name}`).content.querySelector('div').cloneNode(true);
  document.body.append(infoMessage);
};

const closeMessage = function (message) {
  message.remove();
  document.body.style.overflow = '';
};

export const showMessage = function (name) {
  document.body.style.overflow = 'hidden';
  appendInfoMessage(name);
  const resultMessage = document.querySelector(`.${name}`);
  document.addEventListener('keydown', onEscKeyDown);
  closeOnClick();
  if (name === 'error') {
    closeOnButton();
  }

  function closeOnClick () {
    resultMessage.addEventListener('click', () => {
      closeMessage(resultMessage);
      document.removeEventListener('keydown', onEscKeyDown);
    });
  }
  function closeOnButton () {
    const closeButton = resultMessage.querySelector('.error__button');
    closeButton.addEventListener('click', () => {
      closeMessage(resultMessage);
      document.removeEventListener('keydown', onEscKeyDown);
    });
  }
  function onEscKeyDown (evt) {
    evt.preventDefault();
    if (isEscEvent(evt)) {
      closeMessage(resultMessage);
      document.removeEventListener('keydown', onEscKeyDown);
    }
  }
};

