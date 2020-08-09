import { Component, OnInit } from '@angular/core';
import { faMinusCircle, faEdit, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss']
})
export class ProductAdminComponent implements OnInit {
  faMinusCircle = faMinusCircle;
  faEdit = faEdit;
  faPlusSquare = faPlusSquare;
  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  addProduct(type: string) {
    this.route.navigate([`/panel/product/add/${type}`]);
  }
}
