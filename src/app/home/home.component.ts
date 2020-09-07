import { UserService } from './../users-panel/services/user.service';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { hotestPizzas } from './hotestPizzas'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hotestPizzas: Array<any>;
  constructor() {

  }

  ngOnInit(): void {
    this.hotestPizzas = hotestPizzas;
    console.log(this.hotestPizzas);
  }
}
