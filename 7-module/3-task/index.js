import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps - 1;
    this.value = value;
    this.elem = createElement(`
    <div class="container" style="padding: 50px;">
        <div class="slider">
          <div class="slider__thumb" style="left: 50%;">
            <span class="slider__value">2</span>
          </div>
          <div class="slider__progress" style="width: 50%;"></div>
          <div class="slider__steps">
          </div>
      </div>
    </div>
    `);
    const sliderSteps = this.elem.querySelector('.slider__steps');
    for (let i = 0; i < steps; i++){
      const span = document.createElement('span');
      if (i === value) span.classList.add('slider__step-active');
      sliderSteps.appendChild(span);
    }
    this.sliderThumb = this.elem.querySelector('.slider__thumb');
    this.sliderValue = this.elem.querySelector('.slider__value');
    this.sliderProgress = this.elem.querySelector('.slider__progress');
    this.sliderValue.textContent = value;
    this.sliderProgress.style.width = `${(value)*(100/this.steps)}`+'%'
    this.sliderThumb.style.left = `${(value)*(100/this.steps)}`+'%'
    this.slider = this.elem.querySelector('.slider');
    this.elem.addEventListener('click',(e)=>{
        let coords = this.elem.querySelector('.slider').getBoundingClientRect();
        let offsetWidth = (e.clientX-coords.x);
        let value = Math.round(offsetWidth/(coords.width/this.steps));
        if (value !== this.value) {
          this.value = value;
          let sliderChangeEvent = new CustomEvent('slider-change', { 
            detail: this.value, 
            bubbles: true 
          })
          this.elem.dispatchEvent(sliderChangeEvent);
        }
        let spans = this.elem.querySelectorAll('span');
          for (let span of spans){
            span.classList.remove('slider__step-active');
          }
        spans[value].classList.add('.slider__step-active');
        this.sliderValue.textContent = value;
        this.sliderProgress.style.width = `${(value)*(100/this.steps)}`+'%'
        this.sliderThumb.style.left = `${(value)*(100/this.steps)}`+'%'
    });
  }

}
