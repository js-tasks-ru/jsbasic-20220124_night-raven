import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.slideCount = slides.length;
    
    this.carousel  = createElement(`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        
      </div>
    </div>
    `)

    this.innerCarousel = this.carousel.querySelector('.carousel__inner')
    
    for (const slide of slides){
      const newSlide = createElement(`
      <div class="carousel__slide" data-id="${slide.id}">
      <img src="../../assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${slide.price.toFixed(2)}</span>
      <div class="carousel__title">${slide.name}</div>
        <button type="button" class="carousel__button">
          <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
       </button>
      </div>
      </div>`)

      const productAddEvent = new CustomEvent("product-add", { 
          detail: slide.id, 
          bubbles: true 
      });
      const btn = newSlide.querySelector('button');
      btn.addEventListener('click',(e)=>{
        newSlide.dispatchEvent(productAddEvent);
      })
      this.innerCarousel.appendChild(newSlide)
    }

    this.leftArrow = this.carousel.querySelector('.carousel__arrow_left');
    this.rightArrow = this.carousel.querySelector('.carousel__arrow_right');
    this.slideWidth = this.carousel.querySelector('.carousel__slide');
    //this.slideWidth = 988;
    this.slideCount = this.carousel.querySelectorAll('.carousel__slide').length;
    this.leftArrow.style.display = 'none';
    this.translateX = 0;

    this.leftArrow.addEventListener('click',() => {
      this.translateX += this.slideWidth.offsetWidth;
      this.innerCarousel.style.transform = `translateX(${this.translateX}px)`;
      if (this.translateX <= (this.slideWidth.offsetWidth * (this.slideCount-1)) * -1){
        this.rightArrow.style.display = 'none';
      }else {
        this.rightArrow.style= ' ';
      }
      if (this.translateX >= 0){
        this.leftArrow.style.display = 'none';
      }else {
        this.leftArrow.style = ' ';
      }
    })
    
    this.rightArrow.addEventListener('click',() => {
      this.translateX -= this.slideWidth.offsetWidth;
      this.innerCarousel.style.transform = `translateX(${this.translateX}px)`;
      if (this.translateX <= (this.slideWidth.offsetWidth * (this.slideCount-1)) * -1 ){
        this.rightArrow.style.display = 'none';
      }else {
        this.rightArrow.style = ' ';
      }
      if (this.translateX >= 0){
        this.leftArrow.style.display = 'none';
      }else {
        this.leftArrow.style = ' ';
      }
    })
    this.elem = this.carousel; 
  }
}