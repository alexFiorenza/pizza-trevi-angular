import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products = [];
  private cart = new BehaviorSubject<any[]>([]);
  cart$ = this.cart.asObservable();
  constructor() { }
  addToCart(product) {
    this.products = [...this.products, product];
    this.cart.next(this.products);
  }
  getAllProducts() {
    return this.cart.getValue();
  }
  deleteOneProduct(index) {
    this.cart.getValue().splice(index, 1);
  }
  deleteAllProducts() {
    for (let i = 0; this.cart.getValue().length > 0; i++) {
      this.cart.getValue().pop();
    }
    this.cart.next([]);
  }
  getTotal() {
    let total = 0;
    this.cart.getValue().forEach(p => {
      total += p.price;
    });
    return total;
  }
}
