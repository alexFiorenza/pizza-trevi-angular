import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products: Array<any> = [];
  private cart = new BehaviorSubject<Array<any>>([]);
  cart$ = this.cart.asObservable();
  constructor() { }
  addToCart(product) {
    this.products = [...this.products, product];
    this.cart.next(this.products);
  }
  getAllProducts() {
    return this.products;
  }
}
