export const showAdvertsErrorMessage = function (container) {
  const advertsErrorMessage = document.querySelector('#adv-error').content.querySelector('.adv-error').cloneNode(true);
  container.append(advertsErrorMessage);
};


