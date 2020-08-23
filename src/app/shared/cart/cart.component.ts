import { Router } from '@angular/router';
import { CartService } from './../cart.service';
import { Component, OnInit, ElementRef, ViewChild, DoCheck } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import {
  faCartPlus, faMapMarker, faCreditCard
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, DoCheck {
  products = [];
  faCartPlus = faCartPlus;
  faMapMarker = faMapMarker;
  faCreditCard = faCreditCard;
  steps = 0;

  @ViewChild('firstStep') private firstStep: ElementRef;
  @ViewChild('secondStep') private secondStep: ElementRef;
  @ViewChild('thirdStep') private thirdStep: ElementRef;
  constructor(private cartService: CartService, private route: Router) { }
  ngDoCheck() {
  }
  ngOnInit(): void {
    this.products = this.cartService.getAllProducts();

  };
  addStyle(bg, icon) {
    bg.classList.remove('fillBgDisappear');

    bg.classList.add('fillBgAppear');
    document.querySelector(icon).classList.add('changeColorIcon');
    if (this.steps === 0) {
      document.querySelector('.line1Fill').classList.remove('line1FillDisappear');
      document.querySelector('.line1Fill').classList.add('line1FillAppear');
    }
    if (icon === '.icon2') {
      document.querySelector('.line2Fill').classList.remove('line2FillDisappear');
      document.querySelector('.line2Fill').classList.add('line2FillAppear');

    }
  }
  restoreStyles(bg, icon) {
    document.querySelector(icon).classList.remove('changeColorIcon');
    bg.classList.add('fillBgDisappear');
    bg.classList.remove('fillBgAppear');
    switch (this.steps) {
      case 1:
        document.querySelector('.line1Fill').classList.add('line1FillDisappear');
        document.querySelector('.line1Fill').classList.remove('line1FillAppear');
        break;
      case 2:
        document.querySelector('.line2Fill').classList.add('line2FillDisappear');
        document.querySelector('.line2Fill').classList.remove('line2FillAppear');
        break;
    }
  }
  changeStep(lessStep = false) {
    if (lessStep) {
      switch (this.steps) {
        case 0:
          break;
        case 1:
          this.restoreStyles(this.firstStep.nativeElement, '.icon1');
          this.steps--;
          break;
        case 2:
          this.restoreStyles(this.secondStep.nativeElement, '.icon2');
          this.steps--;
          break;
      }
      this.route.navigate(['cart/step', this.steps]);

      return;
    }
    switch (this.steps) {
      case 0:
        this.addStyle(this.firstStep.nativeElement, '.icon1');
        this.steps++;
        break;

      case 1:
        this.addStyle(this.secondStep.nativeElement, '.icon2');
        this.route.navigate(['/step', this.steps]);
        this.steps++;
        break;
      case 2:
        this.addStyle(this.thirdStep.nativeElement, '.icon3');
        this.steps++;
        break;
    }
    this.route.navigate(['cart/step', this.steps]);

  }
}
