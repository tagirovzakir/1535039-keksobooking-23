function getRandomNum(first, second) {
  let min;
  let max;
  let result;
  if (!Number.isFinite(first) || first < 0 || !Number.isFinite(second) || second < 0) { // проверяем на число
    result = 'одно или оба значения не являются конечным числом, либо меньше нуля';
    return result;
  }
  first > second ? (min = Math.ceil(second), max = Math.floor(first)) : (min = Math.ceil(first), max = Math.floor(second)); // меняем местами, если первое число больше второго. Большее число округляем в меньшую сторону, меньшее - в бОльшую
  result = Math.floor((Math.random() * (max - min + 1)) + min); // если a === b, всегда выводится это число
  return result;
}

getRandomNum(1, 5);
