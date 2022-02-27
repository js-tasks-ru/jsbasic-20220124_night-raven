import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value;
    let segments = steps - 1;
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
    let slider = this.elem.querySelector('.slider');
    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sliderValue = this.elem.querySelector('.slider__value');
    let sliderProgress = this.elem.querySelector('.slider__progress');

    sliderValue.textContent = value;
    sliderThumb.ondragstart = () => false;
    sliderProgress.style.width = `${(value)*(100/segments)}`+'%'
    sliderThumb.style.left = `${(value)*(100/segments )}`+'%'
    

    sliderThumb.addEventListener('pointerdown',(e)=>{
        let spans = this.elem.querySelectorAll('span');
        for (let span of spans){
          span.classList.remove('slider__step-active');
        }
        slider.classList.add('slider_dragging');
       
        let coords = this.elem.querySelector('.slider').getBoundingClientRect();
        let offsetWidth = (e.clientX-coords.x);
        let oldValue = this.value;
        document.addEventListener('pointermove',pointMove);
        
        function pointMove(e) {
          coords = slider.getBoundingClientRect();
          offsetWidth = (e.clientX-coords.x);
          if (offsetWidth <=0 || offsetWidth >= coords.width) return;
          sliderThumb.style.left = `${offsetWidth/330*100}%`;
          sliderProgress.style.width = `${offsetWidth/330*100}%`;
          let value = Math.round(offsetWidth/(coords.width/segments ));
          sliderValue.textContent = value;
        };

        this.elem.addEventListener('pointerup',(e) => {
          document.removeEventListener('pointermove',pointMove)
          slider.classList.remove('slider_dragging');
          coords = slider.getBoundingClientRect();
          offsetWidth = (e.clientX-coords.x);
          if (offsetWidth <=0 || offsetWidth >= coords.width) return;
          let value = Math.round(offsetWidth/(coords.width/segments ));
          sliderProgress.style.width = `${(value)*(100/segments)}`+'%';
          sliderThumb.style.left = `${(value)*(100/segments)}`+'%';
          sliderValue.textContent = value;
          if (value !== oldValue) {
            oldValue = value;
            for (let span of spans){
              span.classList.remove('slider__step-active');
            }
            spans[value].classList.add('.slider__step-active');
            let sliderChangeEvent = new CustomEvent('slider-change', { 
              detail: this.value, 
              bubbles: true 
              })
            slider.dispatchEvent(sliderChangeEvent);
        }});
  
    });
  }
}
