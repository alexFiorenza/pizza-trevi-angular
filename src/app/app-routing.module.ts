import { HomeComponent } from './home/home.component';
import { FooterComponent } from './shared/footer/footer.component';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
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
  }
];



export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true });
