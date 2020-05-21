export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    let cartItem = {
      product: product,
      count: 1,
    };

    let cart = this.cartItems.find((item) => item.product.name === product.name);
    if (cart === undefined) {
      this.cartItems.push(cartItem);
    }

    if (cart !== undefined) {
      cart.count = cart.count + 1;
      cart.product.price += cart.product.price;
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find((item) => item.product.id === productId);
    let priceCartItem = cartItem.product.price / cartItem.count;

    if (amount === -1) {
      cartItem.count = cartItem.count - 1;
      cartItem.product.price -= priceCartItem;
    }
    if (amount === 1) {
      cartItem.count = cartItem.count + 1;
      cartItem.product.price += priceCartItem;
    }
    if (cartItem.count === 0) {
      this.cartItems.splice(cartItem);
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
    let total = 0;
    this.cartItems.map((item) => total += item.count);
    return total;
  }

  getTotalPrice() {
    let total = 0;
    this.cartItems.map((item) => total += item.product.price);
    return total;
  }

  onProductUpdate() {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

