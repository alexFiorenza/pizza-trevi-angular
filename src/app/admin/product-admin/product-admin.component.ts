import { ProductService } from './../service/product.service';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { faMinusCircle, faEdit, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss']
})
export class ProductAdminComponent implements OnInit, AfterContentInit {
  faMinusCircle = faMinusCircle;
  faEdit = faEdit;
  faPlusSquare = faPlusSquare;
  products: any[];

  constructor(private route: Router, private productService: ProductService) {

  }
  ngAfterContentInit() {


  }
  ngOnInit(): void {
    this.getAllProducts();
  }
  addProduct(type: string) {
    this.route.navigate([`/panel/product/add/${type}`]);
  }
  getAllProducts() {
    this.productService.getAllProducts().subscribe((p: any) => {
      this.products = p.message;
    });
  }
  deleteAProduct(id) {
    this.productService.deleteProduct(id).subscribe((p) => {
      window.location.reload();
    });
  }
}
