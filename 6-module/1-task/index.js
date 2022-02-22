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
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    const table = document.createElement('table');
    const tHead = document.createElement('thead');
    let keys = Object.keys(rows[0]);
    const tr = document.createElement('tr');
    for (const key of keys) {
      const th = document.createElement('th');
      th.innerText = key;
      tr.appendChild(th);
    }
    tr.appendChild(document.createElement('th'));
    tHead.appendChild(tr);
    table.appendChild(tHead);
    const tBody = document.createElement('tbody');
    for (let row of rows){
      const tr = document.createElement('tr');
        for (let dataKey in row) {
          const td = document.createElement('td');
          td.innerText = row[dataKey];
          tr.appendChild(td);
        }
        const td = document.createElement('td');
        const button = document.createElement('button');
        button.innerText = 'X';
        td.appendChild(button);
        tr.appendChild(td);
        tBody.appendChild(tr);
    }
    table.appendChild(tBody);
    table.addEventListener('click',(e) => {
      if (e.target.tagName === 'BUTTON'){
        const tr = e.target.closest('tr');
        tr.remove();
      }
    })
    this.elem = table; 
  }
}