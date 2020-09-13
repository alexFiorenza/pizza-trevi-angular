import { CartService } from './../../cart.service';
import { CartComponent } from './../cart.component';
import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, DoCheck {
  instructions;
  constructor(private cartComponent: CartComponent, private cartService: CartService) { }

  ngOnInit(): void {
    if (this.cartComponent.steps === 2) {
      return;
    } else {
      window.location.reload();
    }
  }
  ngDoCheck() {
    this.cartService.storeInstructions(this.instructions);
  }
}
