import { ADMIN_ROUTES } from './admin-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { USER_ROUTES } from './../users-panel/users-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateProductComponent } from './update-product/update-product.component';
import { OrdersComponent } from './orders/orders.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminPanelComponent,
    ProductAdminComponent,
    AddProductComponent,
    UpdateProductComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    USER_ROUTES,
    ADMIN_ROUTES
  ],
  exports: [
    AdminPanelComponent,
    ProductAdminComponent,
  ]
})
export class AdminModule { }
