import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render(this.products);
  }
  render(produc) {
    this.elem = document.createElement('div');
    this.elem.classList.add('products-grid');
    this.elem.innerHTML = `<div class="products-grid__inner"></div>`;
    this.grid = this.elem.querySelector('.products-grid__inner');

    for (let product of this.products) {
      this.addProductTo(product);
    }  

  }
  updateFilter(filters) {

    Object.assign(this.filters, filters);
    this.grid.innerHTML = '';
    this.onFilters();
  }
  onFilters() {
    for (let product of this.products) {
      switch (true) {
      case this.filters.noNuts && product.nuts:
        break;
      case this.filters.vegeterianOnly && !product.vegeterian:
        break;
      case this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness:
        break;
      case this.filters.category && product.category != this.filters.category:
        break;
      default: this.addProductTo(product);
      }
    }
  }
  addProductTo(product) {
    let productCard = new ProductCard(product);
    this.grid.append(productCard.elem);
  }
}