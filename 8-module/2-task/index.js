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
    this.addProduct(produc);  

  }
  updateFilter(filters) {

    this.filters = filters;
    this.grid.innerHTML = '';

    let productCart = [];

    if (filters.noNuts === true) {
      productCart = (this.products.filter((item) => !item.nuts === true));
      this.addProduct(productCart);
    }
    if (filters.noNuts === false) {
      productCart = (this.products.filter((item) => !item.nuts === false));
      this.addProduct(productCart);
    }

    if (filters.vegeterianOnly === true) {
      productCart = (this.products.filter((item) => item.vegeterian === true));
      this.addProduct(productCart);
    }
    if (filters.vegeterianOnly === false) {
      productCart = (this.products.filter((item) => item.vegeterian === false));
      this.addProduct(productCart);
    }

    if (filters.maxSpiciness >= 0 && filters.maxSpiciness <= 4) {
      productCart = (this.products.filter((item) => item.spiciness <= filters.maxSpiciness));
      this.addProduct(productCart);
    }

    if (filters.category) {
      productCart = (this.products.filter((item) => item.category === filters.category));
      this.addProduct(productCart);
    }
  }
  addProduct(product) {
    product.forEach(element => {
      let productCard = new ProductCard(element);
      this.grid.append(productCard.elem);
    });
  }
}