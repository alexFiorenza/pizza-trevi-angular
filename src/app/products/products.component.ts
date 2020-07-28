import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() products;
  constructor() { }
  ngOnInit(): void {
  }

}
