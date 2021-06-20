import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

import { Observable } from 'rxjs';
import {
  Address,
  Cart,
  CartEntry,
  Order,
  OrderList,
  Product,
} from '../models/Models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private sessionStorageService: SessionStorageService) {}
  createFreshCart(): any {
    this.sessionStorageService.store('sessionCart', new Cart());
    return this.sessionStorageService.retrieve('sessionCart');
  }
  fetchCart(): any {
    return this.sessionStorageService.retrieve('sessionCart');
  }
  getCartObservable(): Observable<any> {
    return this.sessionStorageService.observe('sessionCart');
  }
  removeCart(): void {
    this.sessionStorageService.clear('sessionCart');
  }
  removeProduct(index: number): void {
    const cart: Cart = this.fetchCart();
    if (cart.totalProducts <= index) {
      return;
    } else {
      cart.entries.splice(index, 1);
      this.calculateCart(cart);
      this.sessionStorageService.clear('sessionCart');
      this.sessionStorageService.store('sessionCart', cart);
    }
  }
  addProduct(productToAdd: Product): void {
    let cart: Cart = this.sessionStorageService.retrieve('sessionCart');
    if (cart === undefined || cart === null) {
      cart = new Cart();
    }
    this.addProductToCart(cart, productToAdd);
    this.calculateCart(cart);
    this.sessionStorageService.clear('sessionCart');
    this.sessionStorageService.store('sessionCart', cart);
  }
  private addProductToCart(cart: Cart, product: Product): void {
    if (cart.entries.length === 0) {
      this.createNewCartEntry(cart, product);
    } else {
      const entries: CartEntry[] = cart.entries.filter(
        (entry) => entry.product.pid === product.pid
      );
      if (entries.length === 0) {
        this.createNewCartEntry(cart, product);
      } else {
        entries[0].setQuantity(entries[0].quantity + 1);
      }
    }
  }
  private createNewCartEntry(cart: Cart, product: Product): void {
    const cartEntry: CartEntry = new CartEntry();
    cartEntry.setProduct(product);
    cartEntry.setQuantity(1);
    cart.entries.push(cartEntry);
  }
  private calculateCart(cart: Cart): void {
    let totalEntries = 0;
    let totalCost = 0;
    cart.entries.forEach((entry) => {
      totalEntries += entry.quantity;
      totalCost += +entry.product.cost.value * entry.quantity;
    });
    cart.totalProducts = totalEntries;
    cart.total = totalCost;
  }
  convertToOrder(): void {
    const cart = this.fetchCart();
    const order: Order = new Order().copyFromCart(cart);
    this.removeCart();
    let orderList: OrderList = this.sessionStorageService.retrieve('orderList');
    if (orderList === undefined || orderList === null) {
      orderList = new OrderList();
      orderList.list.push(order);
    } else {
      if (orderList.list.length === 5) {
        orderList.list.splice(0);
      }
      orderList.list.push(order);
    }
    this.sessionStorageService.store('orderList', orderList);
  }
  removeOrders(): void {
    this.sessionStorageService.clear('orderList');
  }
  fetchLatestOrder(): Order {
    const orderList: OrderList = this.sessionStorageService.retrieve(
      'orderList'
    );
    if (orderList) {
      return orderList.list[orderList.list.length - 1];
    } else {
      return new Order();
    }
  }
  updateCartWithAddress(address: Address): void {
    const cart: Cart = this.fetchCart();
    if (cart !== null && cart !== undefined) {
      cart.shippingAddress = address;
    }
  }
}
