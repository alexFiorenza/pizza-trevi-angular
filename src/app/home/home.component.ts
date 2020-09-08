import { UserService } from './../users-panel/services/user.service';
import { Component, OnInit } from '@angular/core';
import { hotestPizzas } from './hotestPizzas'
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hotestPizzas: Array<any>;
  constructor(private route: Router, private userService: UserService) {

  }

  ngOnInit(): void {
    this.hotestPizzas = hotestPizzas;
  }
  hotPizza(name) {
    this.route.navigate(['menu'], { queryParams: { pizza: name } });
  }
}
