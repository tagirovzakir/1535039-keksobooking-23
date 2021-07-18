import { SERVER_URL, DATA_URL } from './constants.js';

export const loadAdverts = function () {
  return fetch( DATA_URL,
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    });
};

export const sendForm = function (body) {
  return fetch ( SERVER_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    });
};
