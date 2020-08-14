import { CartService } from './../shared/cart.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { faDollarSign, faPlusSquare, faCartPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  faDollarSign = faDollarSign;
  faPlusSquare = faPlusSquare;
  faCartPlus = faCartPlus;
  @Input() products: any[];

  constructor(private cartService: CartService) {

  }
  ngOnInit(): void {

  }
  addToCart(product, productContainer) {

    if (productContainer.classList.contains('not-available')) {
      return;
    }
    this.cartService.addToCart(product);
  }
}
