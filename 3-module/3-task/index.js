/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  str = str.split('-');
  let result = str.map(function(item, index) {
    return index === 0 ? item : item[0].toUpperCase() + item.slice(1);
  });
  return result.join('');
}
