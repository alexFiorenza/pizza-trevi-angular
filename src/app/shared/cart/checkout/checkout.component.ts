import { CartComponent } from './../cart.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private cartComponent: CartComponent) { }

  ngOnInit(): void {
    if (this.cartComponent.steps === 2) {
      return;
    } else {
      window.location.reload();
    }
  }

}
