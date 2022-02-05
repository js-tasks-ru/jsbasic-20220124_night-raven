function getMinMax(str) {
  let arr = str.split(' ');
  arr = arr.filter((element)=>!isNaN(parseFloat(element)));
  return {
    min: Math.min(...arr),
    max: Math.max(...arr),
  }
}
