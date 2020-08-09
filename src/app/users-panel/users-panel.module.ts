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


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
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
