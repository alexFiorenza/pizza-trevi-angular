import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  receivedProducts = [];
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.receivedProducts = this.cartService.getAllProducts();
    console.log(this.receivedProducts)
  }

}
