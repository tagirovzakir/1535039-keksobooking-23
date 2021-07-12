import { isEscEvent } from './utils.js';

const appendInfoMessage = function (name) {
  const infoMessage = document.querySelector(`#${name}`).content.querySelector('div').cloneNode(true);
  document.body.appendChild(infoMessage);
};

const closeMessage = function (message) {
  message.remove();
};

export const showMessage = function (name) {
  appendInfoMessage(name);
  const message = document.querySelector(`.${name}`);
  document.addEventListener('keydown', (evt) => {
    closeOnEsc(evt, message);
  }, {once: true} );
  closeOnClick(message);
  if (name === 'error') {
    closeOnButton(message);
  }
};

function closeOnClick (message) {
  message.addEventListener('click', () => {
    closeMessage(message);
  });
}
function closeOnButton (message) {
  const closeButton = message.querySelector('.error__button');
  closeButton.addEventListener('click', () => {
    closeMessage(message);
  });
}
function closeOnEsc (evt, message) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeMessage(message);
  }
}
