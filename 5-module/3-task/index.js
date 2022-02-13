function initCarousel() {
  const leftArrow = document.querySelector('.carousel__arrow_left');
  const rightArrow = document.querySelector('.carousel__arrow_right');
  const innerCarousel = document.querySelector('.carousel__inner');
  let slideWidth = document.querySelector('.carousel__slide').offsetWidth;
  let translateX = 0;
  let slideCount = document.querySelectorAll('.carousel__slide').length;
  leftArrow.style.display = 'none';
  leftArrow.addEventListener('click',() => {
    translateX += slideWidth;
    innerCarousel.style.transform = `translateX(${translateX}px)`;
    if (translateX <= (slideWidth * (slideCount-1)) * -1){
      rightArrow.style.display = 'none';
    }else {
      rightArrow.style= ' ';
    }
    if (translateX >= 0){
      leftArrow.style.display = 'none';
    }else {
      leftArrow.style = ' ';
    }
  } )
  rightArrow.addEventListener('click',() => {
    translateX -= slideWidth;
    innerCarousel.style.transform = `translateX(${translateX}px)`;
    if (translateX <= (slideWidth * (slideCount-1)) * -1 ){
      rightArrow.style.display = 'none';
    }else {
      rightArrow.style = ' ';
    }
    if (translateX >= 0){
      leftArrow.style.display = 'none';
    }else {
      leftArrow.style = ' ';
    }
  } )
}
