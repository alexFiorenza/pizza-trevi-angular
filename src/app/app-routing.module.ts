import { AddProductComponent } from './admin/add-product/add-product.component';
import { ProductsComponent } from './products/products.component';
import { ProductAdminComponent } from './admin/product-admin/product-admin.component';
import { AdminComponent } from './admin/admin/admin.component';
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
      }
    ]
  },
];



export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true });
