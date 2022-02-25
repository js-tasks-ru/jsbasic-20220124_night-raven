import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    const container = createElement(`
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    <nav class="ribbon__inner">
  
    </nav>
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>`)
    this.ribbonInner = container.querySelector('nav');
    for (const category of categories){
      this.ribbonInner.insertAdjacentHTML('beforeend',`
      <a href="#" class="ribbon__item" data-id=${category.id}>${category.name}</a>
      `)
    }
    this.ribbonInner.querySelector('.ribbon__inner a').classList.add('ribbon__item_active');
    
    this.leftArrow = container.querySelector('.ribbon__arrow_left');
    this.rightArrow = container.querySelector('.ribbon__arrow_right');
   
    this.rightArrow.addEventListener('click',(e)=>{
      this.ribbonInner.scrollBy(350,0);
    });

    this.leftArrow.addEventListener('click',(e)=>{
      this.ribbonInner.scrollBy(-350,0);
    });
    
    this.ribbonInner.addEventListener('scroll',(e)=>{
      let scrollLeft = this.ribbonInner.scrollLeft;
      let scrollWidth = this.ribbonInner.scrollWidth;
      let clientWidth = this.ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;
      if (scrollLeft === 0) {
        this.leftArrow.classList.remove('ribbon__arrow_visible');
      } else {
        this.leftArrow.classList.add('ribbon__arrow_visible');
      }
      if (scrollRight < 1) {
        this.rightArrow.classList.remove('ribbon__arrow_visible');
      } else {
        this.rightArrow.classList.add('ribbon__arrow_visible');
      }
    })

    this.ribbonInner.addEventListener('click',(e)=>{
      if (e.target.tagName === 'A'){
          let links = this.ribbonInner.querySelectorAll('a');
          for (let link of links){
            link.classList.remove('ribbon__item_active');
          }
          e.target.classList.add('ribbon__item_active')
          const ribbonSelectedEvent = new CustomEvent('ribbon-select', { 
          detail: e.target.dataset.id, 
          bubbles: true 
        })
      container.dispatchEvent(ribbonSelectedEvent);
      }
    })
   
      
  this.elem = container;
  }
}
