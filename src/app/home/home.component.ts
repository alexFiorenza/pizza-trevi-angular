import { UserService } from './../users-panel/services/user.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { hotestPizzas } from './hotestPizzas';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public hotestPizzas: Array<any>;
  constructor(private route: Router, private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    const istokenExpired = this.userService.isTokenExpired();
    const token = this.userService.getToken();
    if (istokenExpired && token !== null) {
      const userData = this.userService.getUserData();
      console.log('entered if');
      this.userService.reloadToken(userData).subscribe((r: any) => {
        this.userService.saveToken(r.token);
      });
    }
    this.hotestPizzas = hotestPizzas;
  }
  public hotPizza(name) {
    this.route.navigate(['menu'], { queryParams: { filter: name } });
  }
  redirectIceCream() {
    this.route.navigate(['menu'], { queryParams: { filter: 'helado' } })
  }
}
