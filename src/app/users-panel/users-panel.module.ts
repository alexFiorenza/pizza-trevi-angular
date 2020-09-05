import { SharedModule } from './../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { USER_ROUTES } from './users-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { UserPanelComponent } from './user/user-panel/user-panel.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { UserOrdersComponent } from './user/user-orders/user-orders.component';
import { UserDataComponent } from './user/user-data/user-data.component';
import { UserHistoryComponent } from './user/user-history/user-history.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserPanelComponent,
    UserUpdateComponent,
    UserOrdersComponent,
    UserDataComponent,
    UserHistoryComponent,
  ],
  imports: [
    FontAwesomeModule,
    CommonModule,
    USER_ROUTES,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [UserService]
})
export class UsersPanelModule { }
