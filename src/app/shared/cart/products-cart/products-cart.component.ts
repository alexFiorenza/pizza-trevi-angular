import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CartService } from './../../cart.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {
  faPlusCircle, faAngleDown, faAngleUp, faMinusSquare, faMinus
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss']
})
export class ProductsCartComponent implements OnInit {
  products = [];
  faPlusCircle = faPlusCircle;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faMinusSquare = faMinusSquare;
  totalPrice;
  constructor(private cartService: CartService) { }
  ngOnInit(): void {
    this.products = this.cartService.getAllProducts();
    this.totalPrice = this.cartService.getTotal();
  }
  deleteProduct(index) {
    this.cartService.deleteOneProduct(index);
  }
}
