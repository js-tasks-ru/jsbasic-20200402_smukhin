export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render(steps);
    this.elem.addEventListener('click', (event) => this.onClick(event));
  }
  render(steps) {
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    this.elem.innerHTML = `
  <div class='slider__thumb'>
    <span class='slider__value'>${this.value}</span></div>
  <div class='slider__progress'></div>
  <div class='slider__steps'><span class='slider__step-active'></span></div>`;
    let sliderSteps = this.elem.querySelector('.slider__steps');
    for (let i = 0; i < this.steps - 1; i++) {
      sliderSteps.innerHTML += `<span>`;
    }
  }
  onClick(event) {
    let sliderProgress = this.elem.querySelector('.slider__progress');
    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sizeSteps = 100 / (this.steps - 1);

    let leftPercents = ((event.clientX - this.elem.getBoundingClientRect().left) * 100) / this.elem.offsetWidth;
    let value = Math.round(leftPercents / sizeSteps);
    let percentStep = value / (this.steps - 1) * 100;

    sliderProgress.style.width = `${percentStep}%`;
    sliderThumb.style.left = `${percentStep}%`;

    let sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.innerHTML = value;
    this.value = value;

    let sliderSteps = this.elem.querySelector('.slider__steps');
    let spans = sliderSteps.querySelectorAll('span');

    for (let span of spans) {
      span.classList.remove('slider__step-active');
    }

    spans[value].classList.add('slider__step-active');

    this.changeValueEvent();
  }
  changeValueEvent() {
    let event = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(event);
  }
}
