/**
 * @param   {{ name: string, age: number }[]} users
 * @returns {string[]}  объект
 */
function namify(users) {
  let name = [];
  for (let user of users) {
    name.push(user.name);
  }
  return name;
}
