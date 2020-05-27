import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    let carouselHolder = document.body.querySelector('[data-carousel-holder]');
    let carousel = new Carousel(slides);
    carouselHolder.append(carousel.elem);

    let ribbonHolder = document.body.querySelector('[data-ribbon-holder]');
    this.ribbonMenu = new RibbonMenu(categories);
    ribbonHolder.append(this.ribbonMenu.elem);

    let sliderHolder = document.body.querySelector('[data-slider-holder]');
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    sliderHolder.append(this.stepSlider.elem);

    let cartIconHolder = document.body.querySelector('[data-cart-icon-holder]');
    this.cartIcon = new CartIcon();
    cartIconHolder.append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    let response = await fetch('products.json', {
      method: 'GET',
    });
    let result = await response.json();

    let productsGridHolder = document.body.querySelector('[data-products-grid-holder]');
    this.productsGrid = new ProductsGrid(result);
    productsGridHolder.append(this.productsGrid.elem);


    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener('product-add', (event) => {
      let item = this.productsGrid.products.find((item) => item.id === event.detail);
      this.cart.addProduct(item);
    });

    this.stepSlider.elem.addEventListener('slider-change', (event) => {
      this.productsGrid.updateFilter({ maxSpiciness: event.detail });
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
      this.productsGrid.updateFilter({ category: event.detail });
    }
    );

    let nutsCheckbox = document.getElementById('nuts-checkbox');
    nutsCheckbox.onchange = (event) => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked
      });
    };

    let vegeterianCheckbox = document.getElementById('vegeterian-checkbox');
    vegeterianCheckbox.onchange = (event) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked
      });
    };
  }
}
