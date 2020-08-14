import { ProductService } from './../service/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  form: FormGroup;
  paramsType;
  constructor(private formBuilder: FormBuilder, private productService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.paramsType = params.type;
    });
    console.log(this.paramsType);
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      top: [false, Validators.required],
      available: [false, Validators.required],
      image: [''],
      type: [this.paramsType]
    });
  }
  onSubmit() {
    console.log(this.form.value)
    this.productService.uploadProduct(this.form.value, '').subscribe(data => {
      console.log(data);
    });
  }
}
