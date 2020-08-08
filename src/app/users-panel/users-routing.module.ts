import { AdminComponent } from './admin/admin.component';
import { APP_ROUTES } from './../app-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'panel',
    component: AdminComponent
  }
];



export const USER_ROUTES = RouterModule.forChild(routes);
