export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render(steps);
    this.elem.addEventListener('pointerdown', this.onPointerDown);
    this.elem.addEventListener('click', this.onPointerUp);
  }
  render() {
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

  onPointerDown = (event) => {
    event.preventDefault();
    document.addEventListener('pointermove', this.moveOn);
    document.addEventListener('pointerup', this.onPointerUp);
    this.elem.ondragstart = () => false;
  }

  moveOn = (event) => {
    this.elem.classList.add('slider_dragging');

    let sliderProgress = this.elem.querySelector('.slider__progress');
    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sizeSteps = 100 / (this.steps - 1);

    let leftPercents = ((event.clientX - this.elem.getBoundingClientRect().left) * 100) / this.elem.offsetWidth;
    let value = Math.round(leftPercents / sizeSteps);

    if (value > (this.steps - 1)) {
      value = this.steps - 1;
    }
    if (value < 0) {
      value = 0;
    }

    if (leftPercents <= 100 && leftPercents >= 0) {
      sliderProgress.style.width = `${leftPercents}%`;
      sliderThumb.style.left = `${leftPercents}%`;
    }
    
    this.changeValue(value);
    this.changeSliderStepClass(value);
  }
  clickOn(event) {
    let sliderProgress = this.elem.querySelector('.slider__progress');
    let sliderThumb = this.elem.querySelector('.slider__thumb');

    let sizeSteps = 100 / (this.steps - 1);

    let leftPercents = ((event.clientX - this.elem.getBoundingClientRect().left) * 100) / this.elem.offsetWidth;
    let value = Math.round(leftPercents / sizeSteps);
    let percentStep = value / (this.steps - 1) * 100;

    if (value > (this.steps - 1)) {
      value = this.steps - 1;
    }
    if (value < 0) {
      value = 0;
    }

    if (percentStep <= 100 && percentStep >= 0) {
      sliderProgress.style.width = `${percentStep}%`;
      sliderThumb.style.left = `${percentStep}%`;
    }

    this.changeValue(value);
    this.changeSliderStepClass(value);
  }

  onPointerUp = (event) => {
    this.clickOn(event);

    document.removeEventListener('pointermove', this.moveOn);
    this.elem.classList.remove('slider_dragging');
    this.changeValueEvent();
    this.onPointerUp = null;
  }

  changeValue(param) {
    this.value = param; 
    let sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.innerHTML = this.value;
  }
  changeSliderStepClass(param) {
    
    let sliderSteps = this.elem.querySelector('.slider__steps');
    let spans = sliderSteps.querySelectorAll('span');

    for (let span of spans) {
      span.classList.remove('slider__step-active');
    }

    spans[param].classList.add('slider__step-active');
  }
  changeValueEvent() {
    let event = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(event);
  }
}
