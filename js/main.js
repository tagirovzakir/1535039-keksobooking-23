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

function getRandomNumFloat(first, second, parce = 0) {
  let min;
  let max;
  let result;
  if (!Number.isFinite(first) || first < 0 || !Number.isFinite(second) || second < 0 || !Number.isFinite(parce) || parce < 0) {
    return result = 'одно или оба значения не являются конечным числом, либо меньше нуля';
  }
  parce = Math.floor(parce); // делаем число знаков после запятой целым
  first > second ? (min = second, max = first) : (min = first, max = second);
  max = Math.floor(max * 10 ** parce);
  min = Math.ceil(min * 10 ** parce);
  if (max < min) {
    return result = 'в указанном диапазон нет чисел с необходимым количеством знаков после запятой';
  }
  result = Math.floor((Math.random() * (max - min + 1)) + min); // если a === b, всегда выводится это число
  // result = result.toFixed(parce);
  return result / 10 ** parce;
}

getRandomNum(1, 5);
getRandomNumFloat(1, 5, 2);
