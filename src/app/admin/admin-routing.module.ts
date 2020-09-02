import { AdminVerifyGuard } from './../guards/admin-verify.guard';
import { OrdersComponent } from './orders/orders.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';



import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'panel',
    canActivate: [AdminVerifyGuard],
    component: AdminPanelComponent,
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
      },
      {
        path: 'orders',
        component: OrdersComponent
      }
    ]
  },
];



export const ADMIN_ROUTES = RouterModule.forChild(routes);
