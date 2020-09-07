import { CheckUserGuard } from './../guards/check-user.guard';
import { UserHistoryComponent } from './user/user-history/user-history.component';
import { UserDataComponent } from './user/user-data/user-data.component';
import { UserOrdersComponent } from './user/user-orders/user-orders.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { UserPanelComponent } from './user/user-panel/user-panel.component';

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
    path: 'user',
    component: UserPanelComponent,
    canActivate: [CheckUserGuard],
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: UserDataComponent
      },
      {
        path: 'update',
        component: UserUpdateComponent
      },
      {
        path: 'orders',
        component: UserOrdersComponent
      },
      {
        path: 'history',
        component: UserHistoryComponent
      }
    ]
  }
];



export const USER_ROUTES = RouterModule.forChild(routes);
