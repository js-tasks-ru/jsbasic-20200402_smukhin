import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render(this.products);
  }
  render(products) {
    this.elem = document.createElement('div');
    this.elem.classList.add('products-grid');
    this.elem.innerHTML = `<div class="products-grid__inner"></div>`;
    this.grid = this.elem.querySelector('.products-grid__inner');

    this.products.map(product => {
      let productCard = new ProductCard(product);
      this.grid.append(productCard.elem);
    });
  }
  updateFilter(filters) {

    if (filters.noNuts === true) {
      this.products = this.products.filter(item => !item.nuts === filters.noNuts);
      this.render(this.products);
    }
    if (filters.category) {
      this.products = this.products.filter(item => item.category === filters.category);
      this.render(this.products);
    }
    if (filters.maxSpiciness) {
      this.products = this.products.filter(item => item.spiciness <= filters.maxSpiciness);
      this.render(this.products);
    }
    if (filters.vegeterianOnly === true) {
      this.products = this.products.filter(item => item.vegeterian === filters.vegeterianOnly);
      this.render(this.products);
    }
  }
}