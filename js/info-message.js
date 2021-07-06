import { isEscEvent } from './utils.js';

export const createInfoMessage = function (names) {
  names.forEach((name) => {
    const infoMessage = name.content.querySelector('div').cloneNode(true);
    infoMessage.classList.add('hidden');
    document.body.appendChild(infoMessage);
  });
};

export const closeMessage = function (message) {
  message.classList.add('hidden');
  document.removeEventListener('keydown', closeOnEsc);
  message.removeEventListener('click', closeOnClick);
};

export const showMessage = function (name) {
  const message = document.querySelector(`.${name}`);
  message.classList.remove('hidden');
  closeOnClick(message);
  document.addEventListener('keydown', (evt) => {
    closeOnEsc(evt, message);
  });
  if (message.classList.contains('error')) {
    closeOnButton(message);
  }
};

function closeOnClick (message) {
  message.addEventListener('click', () => {
    closeMessage(message);
  });
}

function closeOnButton (message) {
  const closeButton = document.querySelector('.error__button');
  closeButton.addEventListener('click', () => {
    closeMessage(message);
  });
}
function closeOnEsc(evt, message) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeMessage(message);
  }
}


