import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() products: any[];

  faDollarSign = faDollarSign;
  constructor() { }
  ngOnInit(): void {

  }
}
