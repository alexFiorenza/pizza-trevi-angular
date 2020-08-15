import { UpdateProductComponent } from './admin/update-product/update-product.component';
import { CartComponent } from './shared/cart/cart.component';
import { HeaderComponent } from './shared/header/header.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { ProductAdminComponent } from './admin/product-admin/product-admin.component';
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
    component: CartComponent
  },
  {
    path: 'panel',
    children: [
      {
        path: '',
        redirectTo: 'product',
        pathMatch: 'full'
      },
      {
        path: 'product',
        component: ProductAdminComponent
      },
      {
        path: 'product/add/:type',
        component: AddProductComponent
      },
      {
        path: 'product/update/:type/:id',
        component: UpdateProductComponent
      }
    ]
  },
];



export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true });
