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
    const tokenValidation = this.userService.isTokenExpired();
    if (tokenValidation) {
      const userData = this.userService.getUserData();
      this.userService.reloadToken(userData).subscribe((r: any) => {
        this.userService.saveToken(r.token);
      });
    }
    this.hotestPizzas = hotestPizzas;
  }
  public hotPizza(name) {
    this.route.navigate(['menu'], { queryParams: { pizza: name } });
  }
}
