import { SearchPipe } from './pipes/search.pipe';
import { AdminModule } from './admin/admin.module';
import { ProductsComponent } from './products/products.component';
import { UsersPanelModule } from './users-panel/users-panel.module';
import { SharedModule } from './shared/shared.module';
import { APP_ROUTES } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ProductsComponent,
    SearchPipe,

  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FontAwesomeModule,
    UsersPanelModule,
    SharedModule,
    AdminModule,
    APP_ROUTES,
    FormsModule
  ],
  exports: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ProductsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
