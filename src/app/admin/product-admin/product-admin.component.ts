import { ProductService } from './../service/product.service';
import { Component, OnInit } from '@angular/core';
import { faMinusCircle, faEdit, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss']
})
export class ProductAdminComponent implements OnInit {
  faMinusCircle = faMinusCircle;
  faEdit = faEdit;
  faPlusSquare = faPlusSquare;
  products: any[];
  flavorsProducts: any;
  constructor(private route: Router, private productService: ProductService) {
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
      this.flavorsProducts = this.products.filter(p => {
        return p.type === 'helado';
      });
    });

  }
  deleteAProduct(id) {
    this.productService.deleteProduct(id).subscribe((p) => {
      window.location.reload();
    });
  }
  updateProduct(type: string, product) {
    this.route.navigate([`/panel/product/update/${type}/${product._id}`]);
  }
}
