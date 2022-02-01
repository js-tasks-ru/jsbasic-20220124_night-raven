function sumSalary(salaries) {
  let sum = 0;
  for (let salary in salaries){
    if ( ! isNaN(salaries[salary]) && isFinite(salaries[salary]) && typeof(salaries[salary]==='number')){
      sum+=salaries[salary];
  }
}
  return sum;
}
