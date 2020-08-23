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
    return this.products;
  }
  deleteOneProduct(index) {
    this.cart.getValue().splice(index, 1);
  }
}
