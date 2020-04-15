/**
 * showSalary
 * @param {Array} data - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(data, age) {
  let filterName = data.filter(names => names.age <= age);
  let result = filterName.map(name => name.name + ', ' + name.balance);
  return result.join('\n');
}
