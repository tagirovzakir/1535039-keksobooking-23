function getRandomNum(first, second) {
  if (!Number.isFinite(first) || first < 0 || !Number.isFinite(second) || second < 0) {
    throw new Error('Одно или оба значения не являются конечным числом, либо меньше нуля');
  }
  const [min, max] = first > second ? [Math.ceil(second), Math.floor(first)] : [Math.ceil(first), Math.floor(second)];
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

function getRandomNumFloat(first, second, parce = 0) {
  if (!Number.isFinite(first) || first < 0 || !Number.isFinite(second) || second < 0 || !Number.isFinite(parce) || parce < 0) {
    throw new Error('одно или оба значения не являются конечным числом, либо меньше нуля');
  }
  parce = Math.floor(parce);
  const [min, max] = first > second ? [second, first] : [first, second];
  const result = Math.random() * (max - min) + min;
  return Number(result.toFixed(parce));
}

getRandomNum(-8, 5);
getRandomNumFloat(1, 5);
