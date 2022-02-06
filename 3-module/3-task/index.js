function camelize(str) {
  let arr = str.split('-');
  return arr.map((element,index)=>{
    if (index!==0){
      return element[0].toUpperCase() + element.slice(1);
    }
    return element
  }).join('')
}
