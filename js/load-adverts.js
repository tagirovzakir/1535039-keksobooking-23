import { getRandomNum } from './utils.js';

export const loadAdverts = function (advCounts) {
  return fetch(
    'https://23.javascript.pages.academy/keksobooking/data',
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
    })
    .then((json) => {
      const firstElement = getRandomNum(0, json.length - advCounts + 1);
      return json.slice(firstElement, firstElement + advCounts);
    });
};

