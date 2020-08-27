import { CheckoutComponent } from './shared/cart/checkout/checkout.component';
import { ProductsCartComponent } from './shared/cart/products-cart/products-cart.component';
import { LocationComponent } from './shared/cart/location/location.component';
import { CartComponent } from './shared/cart/cart.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'cart',
    component: CartComponent,
    children: [
      {
        path: '',
        redirectTo: 'step/0',
        pathMatch: 'full'
      },
      {
        path: 'step/0',
        component: ProductsCartComponent
      },
      {
        path: 'step/1',
        component: LocationComponent,
      },
      {
        path: 'step/2',
        component: CheckoutComponent
      }
    ]
  },

];



export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true });
