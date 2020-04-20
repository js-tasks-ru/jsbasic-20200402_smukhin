/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  let ul = document.createElement('ul');
  for (let friend of friends) {
    let li = document.createElement('li');
    li.append(friend.firstName + ' ' + friend.lastName);
    ul.append(li);
  }
  return ul;
}
