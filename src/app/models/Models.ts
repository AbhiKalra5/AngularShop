export class User {
  constructor() {}

  uid = '';
  password = '';
  name = '';
  'email-id' = '';
}
export interface Category {
  categoryId: string;
  description: string;
}

export class Product {
  constructor() {}
  pid = '';
  name = '';
  categoryid = '';
  features = '';
  cost: any;
  img = '';
}

export class Cart {
  constructor() {}
  entries: CartEntry[] = [];
  total = 0;
  totalProducts = 0;
  uid = '';
  shippingAddress = new Address();
}
export class Order {
  constructor() {}
  entries: CartEntry[] = [];
  total = 0;
  totalProducts = 0;
  uid = '';
  shippingAddress = new Address();
  copyFromCart(cart: Cart): Order {
    this.entries = cart.entries;
    this.totalProducts = cart.totalProducts;
    this.shippingAddress = cart.shippingAddress;
    this.total = cart.total;
    return this;
  }
}
export class OrderList {
  constructor() {}
  list: Order[] = [];
}
export class CartEntry {
  constructor() {}
  product = new Product();
  quantity = 0;
  setProduct(product: Product): void {
    this.product = product;
  }
  setQuantity(quantity: number): void {
    this.quantity = quantity;
  }
}
export class Address {
  constructor() {}
  line1 = '';
  line2 = '';
  postal = 0;
  city = '';
  state = '';
}
