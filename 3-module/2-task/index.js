/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @returns {number[]}
 */
function filterRange(arr, a, b) {
  let filterNum = arr
  .filter((num) => num >= a && num <= b);
  return filterNum;
}
