import { CartService } from './../../cart.service';
import { CartComponent } from './../cart.component';
import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, DoCheck {
  instructions;
  extraMoney;
  total;
  constructor(private cartComponent: CartComponent, private cartService: CartService) { }

  ngOnInit(): void {
    if (this.cartComponent.steps === 2) {
      this.total = this.cartService.getTotal();
      this.extraMoney = this.total;
      return;
    } else {
      window.location.reload();
    }
  }
  ngDoCheck() {
    this.cartService.storeInstructions(this.instructions);
    this.cartService.setExtraMoney(this.extraMoney);
    if (this.extraMoney < this.total) {
      this.extraMoney = this.total;
    }
  }


}
