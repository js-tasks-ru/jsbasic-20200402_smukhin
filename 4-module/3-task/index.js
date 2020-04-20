/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */

let table = document.querySelector('.js-teachers');

function highlight(table) {
    let tr;
    for (let i = 1; i < table.rows.length; i++) {
    tr = table.rows[i];
    let status = tr.cells[3];
    isStatus(status, tr)
       
    let gender = tr.cells[2];
    isGender(gender, tr);
      
    let age = tr.cells[1];
    isAge(age, tr);
    }

  function isAge(age, tr) {
    age.textContent < 18 ? tr.style.textDecoration = 'line-through' : '';
  }
  function isGender(gender, tr) {
    gender.textContent == 'f' ? tr.classList.add('female') :
    gender.textContent == 'm' ? tr.classList.add('male') : '';
  }
  function isStatus(status, tr) {
    status.hasAttribute('data-available') ?
    status.getAttribute('data-available') == 'true' ?
    tr.classList.add('available') :
    tr.classList.add('unavailable') :
    tr.setAttribute('hidden','');
  }
}


