export const sendForm = function (body) {
  return fetch (
    'https://23.javascript.pages.academy/keksobooking ',
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
