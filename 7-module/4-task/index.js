import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value;
    let segments = steps - 1;
    this.elem = createElement(`
        <div class="slider">
          <div class="slider__thumb" style="left: 50%;">
            <span class="slider__value">2</span>
          </div>
          <div class="slider__progress" style="width: 50%;"></div>
          <div class="slider__steps">
          </div>
      </div>
    `);
    const sliderSteps = this.elem.querySelector('.slider__steps');
    for (let i = 0; i < steps; i++){
      const span = document.createElement('span');
      if (i === value) span.classList.add('slider__step-active');
      sliderSteps.appendChild(span);
    }
    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sliderValue = this.elem.querySelector('.slider__value');
    let sliderProgress = this.elem.querySelector('.slider__progress');

    sliderValue.textContent = value;
    sliderThumb.ondragstart = () => false;
    sliderProgress.style.width = `${(value)*(100/segments)}`+'%'
    sliderThumb.style.left = `${(value)*(100/segments )}`+'%'
    

    this.elem.addEventListener('click',(e)=>{
      let newLeft = (e.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
      let value = Math.round(segments * newLeft);
      let valuePercents = (value / segments) * 100;
     
      sliderProgress.style.width = `${valuePercents}`+'%';
      sliderThumb.style.left = `${valuePercents}`+'%';
      sliderValue.textContent = value;
      this.elem.dispatchEvent(
        new CustomEvent('slider-change', {
          detail: value,
          bubbles: true
        })
      );
      });

    sliderThumb.addEventListener('pointerdown',(e)=>{
        let elem = this.elem;
        document.addEventListener('pointermove',pointMove);
        function pointMove(e) {
          elem.classList.add('slider_dragging');
          let left = e.clientX - elem.getBoundingClientRect().left;
          let leftRelative = left / elem.offsetWidth;
          if (leftRelative < 0) {
            leftRelative = 0;
          }
          if (leftRelative > 1) {
            leftRelative = 1;
          }
          
          let leftPercents = leftRelative * 100;
          let thumb = elem.querySelector('.slider__thumb');
          let progress = elem.querySelector('.slider__progress');
          thumb.style.left = `${leftPercents}%`;
          progress.style.width = `${leftPercents}%`;
          let segments = steps - 1;
          let approximateValue = leftRelative * segments;

          let value = Math.round(approximateValue);
          sliderValue.textContent = value;
          let sliderChangeEvent = new CustomEvent('slider-change', { 
            detail: value, 
            bubbles: true 
            })  
           elem.dispatchEvent(sliderChangeEvent); 
        };

        this.elem.addEventListener('pointerup',(e) => {
          document.removeEventListener('pointermove',pointMove)
          elem.classList.remove('slider_dragging');
          
        });
  
    });
  }
}
