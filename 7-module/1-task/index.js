import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement('div');
    this.render(categories);
    this.scrollRibbon();
    this.elem.addEventListener('click', (event) => this.selectionCategory(event)); 
  }
  render(categories) {
    this.elem.classList.add('ribbon');
    let buttonLeft = `<button class='ribbon__arrow ribbon__arrow_left'><img src ="/assets/images/icons/angle-icon.svg"></button>`;
    let buttonRight = `<button class='ribbon__arrow ribbon__arrow_right ribbon__arrow_visible'><img src ="/assets/images/icons/angle-icon.svg"></button>`;
    let ribbonItem = '';
    for (let category of categories) {
      ribbonItem += `<a href="#" class='ribbon__item' data-id='${category.id}'>${category.name}</a>`; 
    }
    let ribbonInner = `${buttonLeft}<nav class='ribbon__inner'>${ribbonItem}</nav>${buttonRight}`;
    this.elem.innerHTML = ribbonInner;
  }

  selectionCategory(event) {
    event.preventDefault();
    if (event.target.classList.contains('ribbon__item')) {

      let items = event.target.closest('.ribbon__inner').querySelectorAll('.ribbon__item');
      for (let item of items) {
        item.classList.remove('ribbon__item_active');
      }

      event.target.classList.add('ribbon__item_active');

      let customEvent = new CustomEvent('ribbon-select', {
        detail: event.target.dataset.id,
        bubbles: true
      });

      event.target.dispatchEvent(customEvent);
    }
  }
  
  scrollRibbon() {
    let buttonLeft = this.elem.querySelector('.ribbon__arrow_left');
    let buttonRight = this.elem.querySelector('.ribbon__arrow_right');
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    
    this.elem.addEventListener('click', scrollCategory);
    ribbonInner.addEventListener('scroll', function() {
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;
      scrollLeft === 0 ? buttonLeft.classList.remove('ribbon__arrow_visible') :
      scrollRight < 1 ? buttonRight.classList.remove('ribbon__arrow_visible') :
      buttonLeft.classList.add('ribbon__arrow_visible');
    });
    
    function scrollCategory(event) {
      if (event.target.closest('.ribbon__arrow')) {
        let target = event.target.closest('.ribbon__arrow');
        target.classList.contains('ribbon__arrow_left') ?
        ribbonInner.scrollBy(-350, 0) : ribbonInner.scrollBy(350, 0);
        }
    };
  }
}
