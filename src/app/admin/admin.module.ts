import { USER_ROUTES } from './../users-panel/users-routing.module';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { AddProductComponent } from './add-product/add-product.component';


@NgModule({
  declarations: [
    AdminComponent,
    ProductAdminComponent,
    AddProductComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    USER_ROUTES
  ],
  exports: [
    AdminComponent,
    ProductAdminComponent,
  ]
})
export class AdminModule { }
