import { isEscEvent } from './utils.js';

const appendInfoMessage = function (name) {
  const infoMessage = document.querySelector(`#${name}`).content.querySelector('div').cloneNode(true);
  infoMessage.classList.add('result-message');
  document.body.appendChild(infoMessage);
};

const closeMessage = function () {
  const message = document.querySelector('.result-message');
  document.removeEventListener('keydown', onEscKeyDown);
  message.remove();
  document.body.style.overflow = '';
};

export const showMessage = function (name) {
  document.body.style.overflow = 'hidden';
  appendInfoMessage(name);
  const resultMessage = document.querySelector(`.${name}`);
  document.addEventListener('keydown', onEscKeyDown);
  closeOnClick(resultMessage);
  if (name === 'error') {
    closeOnButton(resultMessage);
  }
};

function closeOnClick (message) {
  message.addEventListener('click', () => {
    closeMessage();
  });
}
function closeOnButton (message) {
  const closeButton = message.querySelector('.error__button');
  closeButton.addEventListener('click', () => {
    closeMessage();
  });
}
function onEscKeyDown(evt) {
  evt.preventDefault();
  if (isEscEvent(evt)) {
    closeMessage();
  }
}
