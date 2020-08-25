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
  shouldShowFlavors = false;
  constructor(private cartService: CartService) { }
  @ViewChild('flavors') private flavors: ElementRef;
  ngOnInit(): void {
    this.products = this.cartService.getAllProducts();
  }
  showFlavors() {
    let icon = document.querySelector('#showFlavors');
    if (!this.shouldShowFlavors) {
      icon.classList.remove('restoreRotation');

      icon.classList.add('rotate180deg');
      this.flavors.nativeElement.classList.add('flex');
      this.flavors.nativeElement.classList.remove('hidden');
      this.shouldShowFlavors = true;
    } else {
      icon.classList.remove('rotate180deg');
      icon.classList.add('restoreRotation');
      this.flavors.nativeElement.classList.remove('flex');
      this.flavors.nativeElement.classList.add('hidden');
      this.shouldShowFlavors = false;
    }
  }
  deleteProduct(index) {
    this.cartService.deleteOneProduct(index);
  }
}
