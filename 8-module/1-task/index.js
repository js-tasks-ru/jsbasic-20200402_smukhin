import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<button class="cart-icon"></button>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    let scroll = window.pageYOffset;
    let cart = this.elem.getBoundingClientRect();
    let container = this.elem.closest('.container');
    let coordinateContainer = container.getBoundingClientRect().right;
    let documentWidth = document.documentElement.clientWidth - this.elem.offsetWidth;
    
    let rightCoordinate = Math.min(
      coordinateContainer + 20,
      documentWidth - 10
    );

    if (cart.y <= 0 && document.documentElement.clientWidth >= 767) {
      this.elem.style.cssText = `
      position: fixed;
      top: 50px;
      z-index: 1000;
      left: ${rightCoordinate}px;
      `;
    }

    if (scroll === 0 || document.documentElement.clientWidth <= 767) {
      this.elem.style = '';
    }
  }
}
