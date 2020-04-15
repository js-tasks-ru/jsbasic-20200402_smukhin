/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let result = {};
  str = str.split(/\s|,/);
  let newNumber = str.filter(num => +num);
  newNumber = newNumber.sort((a, b) => a - b);
  result.max = +newNumber.pop();
  result.min = +newNumber.shift();
  return result;
}
