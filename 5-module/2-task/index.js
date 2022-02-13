function toggleText() {
  btn = document.querySelector('.toggle-text-button');
  btn.addEventListener('click',()=>{
    div = document.querySelector('#text');
    if (div.hasAttribute('hidden')){
      div.removeAttribute('hidden');
    } else {
      div.setAttribute('hidden','true');
    } 
  })
}
