function initCarousel() {
  let carousel = document.querySelector('.carousel');
  let inner = carousel.querySelector('.carousel__inner');
  let buttonLeft = carousel.querySelector('.carousel__arrow_left');
  let buttonRight = carousel.querySelector('.carousel__arrow_right');
  let width = inner.offsetWidth;
  let position = 0;
  buttonLeft.style.display = 'none';

  carousel.addEventListener('click', slider);

  function slider(event) {
    let target = event.target.closest('.carousel__arrow');
    target.classList.contains('carousel__arrow_left') ? arrowLeft(target) : target.classList.contains('carousel__arrow_right') ? arrowRight(target) : '';
  }

  function arrowRight(target) {
    if (position > 0 || position < (-width * 2)) return;
    position -= width;
    inner.style.transform = `translateX(${position}px)`;
    position < (-width * 2) ? buttonRight.style.display = 'none' : buttonLeft.style.display = '';
  }
  function arrowLeft(target) {
    if (position >= 0) return;
    position += width;
    inner.style.transform = `translateX(${position}px)`;
    position == 0 ? buttonLeft.style.display = 'none' : buttonRight.style.display = '';
  }
}
