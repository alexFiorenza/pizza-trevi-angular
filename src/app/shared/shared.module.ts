import { CartComponent } from './cart/cart.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './cart/location/location.component';
import { ProductsCartComponent } from './cart/products-cart/products-cart.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    CartComponent,
    LocationComponent,
    ProductsCartComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    CartComponent,
  ]
})
export class SharedModule { }
