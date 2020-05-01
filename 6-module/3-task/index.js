import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    this.render(slides);

    this.initCarousel();

    this.elem.addEventListener('click', (event) => this.addCard(event));
  }
    addCard(event) {
      if (event.target.closest('.carousel__button')) {
        let eventCastom = (new CustomEvent("product-add", {
          detail: event.target.closest('.carousel__slide').dataset.id,
          bubbles: true
        }));
        event.target.dispatchEvent(eventCastom);
      }
    }
           
    render(slides) {
      this.elem = document.createElement('div');
      this.elem.classList.add('carousel');
      
      this.button = `<div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>`;
      
      this.rows = '';
      for (let slide of slides) {
            this.rows += `
  <div class="carousel__slide" data-id="${slide.id}">
    <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
    <div class="carousel__caption">
      <span class="carousel__price">€${slide.price.toFixed(2)}</span>
      <div class="carousel__title">${slide.name}</div>
      <button type="button" class="carousel__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
  </div>
  `;
      }
      this.inner = `${this.button}<div class= 'carousel__inner'>${this.rows}</div>`;
      
      this.elem.innerHTML = this.inner;
    }

    initCarousel() {
      let inner = this.elem.querySelector('.carousel__inner');
      let slide = this.elem.querySelectorAll('.carousel__slide');
      let buttonLeft = this.elem.querySelector('.carousel__arrow_left');
      let buttonRight = this.elem.querySelector('.carousel__arrow_right');
      let position = 0;
      buttonLeft.style.display = 'none';

      this.elem.addEventListener('click', initSlider);

  function initSlider(event) {
    if (event.target.closest('.carousel__arrow')) {
    let target = event.target.closest('.carousel__arrow');
    target.classList.contains('carousel__arrow_left') ? scrollLeft(target) : target.classList.contains('carousel__arrow_right') ? scrollRight(target) : ''; 
    }
  }

  function scrollRight(target) {
    if (position > 0 || position < (-inner.offsetWidth * (slide.length - 2))) return;
    position -= inner.offsetWidth;
    inner.style.transform = `translateX(${position}px)`;
    position < (-inner.offsetWidth * (slide.length - 2)) ? buttonRight.style.display = 'none' : buttonLeft.style.display = '';
  }
  function scrollLeft(target) {
    if (position >= 0) return;
    position += inner.offsetWidth;
    inner.style.transform = `translateX(${position}px)`;
    position == 0 ? buttonLeft.style.display = 'none' : buttonRight.style.display = '';
  }
 }
}
