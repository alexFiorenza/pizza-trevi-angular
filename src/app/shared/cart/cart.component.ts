import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products = [];
  productsToShow = [];
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.products = this.cartService.getAllProducts();
  };
}
