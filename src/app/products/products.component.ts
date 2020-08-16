import { CartService } from './../shared/cart.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { faDollarSign, faPlusSquare, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  faDollarSign = faDollarSign;
  faPlusSquare = faPlusSquare;
  faCartPlus = faCartPlus;
  urlAPi = environment.url;
  @Input() products: any[];
  @Input() filterProduct;
  @Output() clickedEvent = new EventEmitter<any>();
  constructor(private cartService: CartService) {

  }
  ngOnInit(): void {

  }
  addToCart(product, productContainer) {
    this.clickedEvent.emit(product);
  }
}
