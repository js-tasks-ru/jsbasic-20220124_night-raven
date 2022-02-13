function highlight(table) {
    const rows = table.tBodies[0].rows;
    for (const row of rows){
      if (+ row.cells[1].innerText < 18){
        row.style="text-decoration: line-through"
      }
      if(row.cells[2].innerText ==='m'){
        row.classList.add('male');
      }
      if(row.cells[2].innerText ==='f'){
        row.classList.add('female');
      }
      if (row.cells[3].dataset.available === undefined){
        row.setAttribute('hidden','hidden')
      }
      if (row.cells[3].dataset.available === 'false'){
        row.classList.add('unavailable')
      }
      if (row.cells[3].dataset.available === 'true'){
        row.classList.add('available')
      }
    }
    }