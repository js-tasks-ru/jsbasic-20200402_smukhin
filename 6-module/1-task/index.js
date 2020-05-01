/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {
  constructor(rows) {
    this.row = rows;
    this.elem = document.createElement('table');
    this.elem.innerHTML = `<thead><th>Имя</td><th>Возраст</td><th>Зарплата</td><th>Город</td><th></td><tbody>${this.createRows()}`; // после tbody появился undefined
    this.elem.addEventListener('click', (event) => event.target.closest('tr').remove());
  }
  createRows() {
    this.rows = '';
      for (let i = 0; i < this.row.length; i++) {
        this.rows += `<tr>
    <td>${this.row[i].name}</td>
    <td>${this.row[i].age}</td>
    <td>${this.row[i].salary}</td>
    <td>${this.row[i].city}</td>
    <td><button>X</button></td>`
      }
      return this.rows;
    }
}
