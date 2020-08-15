import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from './../service/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  form: FormGroup;
  paramsId;
  paramsType;
  productData;
  constructor(private formBuilder: FormBuilder, private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.paramsType = params.type;
      this.paramsId = params.id;
    });
    this.productService.getOneProduct(this.paramsId).subscribe((data: any) => {
      this.productData = data.message;
      this.form = this.formBuilder.group({
        name: [this.productData.name, Validators.required],
        price: [this.productData.price, Validators.required],
        description: [this.productData.description, Validators.required],
        top: [this.productData.top, Validators.required],
        available: [this.productData.available, Validators.required],
        image: [this.productData.image],
        type: [this.productData.type]
      });
    });

  }
  onSubmit() {
    const formData = this.form.value;
    this.productService.updateOneProduct(this.productData._id, formData).subscribe(p => {
      console.log(p);
    });
  }
}
