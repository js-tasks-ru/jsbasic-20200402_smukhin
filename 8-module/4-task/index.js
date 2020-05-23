import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    let cartItem = {
      product: product,
      count: 1
    };

    let cart = this.cartItems.find((item) => item.product.id === product.id);
    if (cart === undefined) {
      this.cartItems.push(cartItem);
    }

    if (cart !== undefined) {
      cart.count = cart.count + 1;
    }

    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find((item) => item.product.id === productId);

    cartItem.count += amount;
    if (cartItem.count < 1) {
      let index = this.cartItems.indexOf(cartItem);
      this.cartItems.splice(index, 1);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    if (this.cartItems.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems.map((item) => totalCount += item.count);
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.map((item) => totalPrice += item.product.price * item.count);
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {

    this.modal = new Modal();

    this.productCards = document.createElement('div');

    for (let item of this.cartItems) {
      this.productCards.append(this.renderProduct(item.product, item.count));
    }
    this.productCards.append(this.renderOrderForm());

    this.modal.setTitle('Your order');
    this.modal.setBody(this.productCards);
    this.modal.open();

    this.modal.elem.onclick = (event) => {
      if (event.target.closest('.cart-counter__button')) {
        let target = event.target.closest('.cart-product');
        event.target.closest('.cart-counter__button_minus') ? 
        this.updateProductCount(target.dataset.productId, -1) : 
        this.updateProductCount(target.dataset.productId, 1);
      }
    }

    let form = document.forms[0];
    form.onsubmit = (event) => this.onSubmit(event);
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    if (document.body.classList.contains('is-modal-open') && this.modal) {
      let productId = cartItem.product.id;
      let modalBody = this.productCards;
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector('.cart-buttons__info-price');

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      let cartProduct = modalBody.querySelector(`[data-product-id="${productId}"]`);
      if (cartItem.count === 0) {
        cartProduct.remove();
      }
      if (this.isEmpty()) {
        this.modal.close();
      }
    }
  }

  onSubmit(event) {
    event.preventDefault();

    let url = "https://httpbin.org/post";

    let buttonForm = event.target.querySelector('[type="submit"]');
    buttonForm.classList.add('is-loading');

    let formData = new FormData(event.target);

    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then((res) => {
      this.modal.setTitle('Success!');
      this.cartItems = [];
      this.cartIcon.update(this);
      let newBody = `<div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>`;
      this.productCards.innerHTML = newBody;
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

