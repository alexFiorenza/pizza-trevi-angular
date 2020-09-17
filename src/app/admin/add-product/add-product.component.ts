import { ProductService } from './../service/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  form: FormGroup;
  paramsType;
  image;
  dataToSend;
  updatingData = false;
  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private formBuilder: FormBuilder, private productService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.paramsType = params.type;
    });
    let typeTmp = this.paramsType;
    if (this.paramsType === 'helado') {
      typeTmp = '1kg';
    }
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      top: [false, Validators.required],
      available: [false, Validators.required],
      type: [typeTmp, Validators.required]
    });
  }
  onSubmit() {
    this.dataToSend = this.form.value;
    this.updatingData = true;
    Object.assign(this.dataToSend, { image: this.image });
    this.productService.uploadProduct(this.dataToSend).subscribe(data => {
      this.router.navigate(['/panel/product']);
    });
  }
  handleFileInput($event) {
    this.image = $event[0];
  }
}
