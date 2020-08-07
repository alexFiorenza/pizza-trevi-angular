import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { USER_ROUTES } from './users-routing.module';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AdminComponent
  ],
  imports: [
    FontAwesomeModule,
    CommonModule,
    USER_ROUTES,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    AdminComponent
  ],
  providers: [UserService]
})
export class UsersPanelModule { }
