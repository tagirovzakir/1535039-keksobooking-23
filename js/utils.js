export const getRandomNum = function (first, second) {
  if (!Number.isFinite(first) || !Number.isFinite(second)) {
    throw new Error('Одно или оба значения не являются конечным числом');
  }
  const [min, max] = Math.abs(first) > Math.abs(second) ?
    [Math.ceil(Math.abs(second)), Math.floor(Math.abs(first))] :
    [Math.ceil(Math.abs(first)), Math.floor(Math.abs(second))];
  return Math.floor((Math.random() * (max - min + 1)) + min);
};

export const getRandomNumFloat = function (first, second, parce = 0) {
  if (!Number.isFinite(first) || !Number.isFinite(second) || !Number.isFinite(parce)) {
    throw new Error('одно или оба значения не являются конечным числом');
  }
  parce = Math.floor(parce);
  const [min, max] = Math.abs(first) > Math.abs(second) ?
    [Math.abs(second), Math.abs(first)] :
    [Math.abs(first), Math.abs(second)];
  const result = Math.random() * (max - min) + min;
  return Number(result.toFixed(parce));
};

export const getAvatarImage = function (length) {
  const avatars = new Array(length).fill(0).map((photo, index) => {
    photo = `${index + 1}`;
    if (photo.length === 1) {
      return `0${photo}`;
    }
    return photo;
  });
  if (!avatars.length) {return 'img/avatars/user00.png';}
  const avatarNumber = avatars.splice(getRandomNum(0, avatars.length - 1), 1);
  return `img/avatars/user${avatarNumber}.png`;
};

export const getParceArray = function (array) {
  const parceArray = [];
  for (const item of array) {
    if (getRandomNum(+false, +true)) {
      parceArray.push(item);
    }
  }
  return parceArray;
};

export const getRandomArrayElements = function (array) {
  return array[getRandomNum(0, array.length - 1)];
};
