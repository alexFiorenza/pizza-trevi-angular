import { CartService } from './../shared/cart.service';
import { ProductService } from './../admin/service/product.service';
import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import {
  faAngleDown, faSearch, faTimesCircle,
  faCircle, faAngleUp, faPlusSquare, faMinusSquare, faPlus
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Product } from '../interfaces/product';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  filterProduct = '';
  faAngleDownIcon = faAngleDown;
  faSearch = faSearch;
  faCircle = faCircle;
  faTimesCircle = faTimesCircle;
  faPlusSquare = faPlusSquare;
  faMinusSquare = faMinusSquare;
  products: any[];
  empanadasArray;
  iceCreamArray;
  availableToBuy = false;
  productSelected: Partial<Product>;
  productsFiltered: any[] = [];
  filtersArray: string[] = [];
  usedFilters = false;
  quantityProduct = 1;
  alertLaunched = false;
  counter: number = 0;
  maxSelection = false;
  @ViewChild('alertContainer') alert: ElementRef;
  @ViewChild('filters') filtersPanel: ElementRef;
  @ViewChild('maxprice') maxSpan: ElementRef;
  @ViewChild('lessprice') lessSpan: ElementRef;
  @ViewChild('icon1') iconLess: ElementRef;
  @ViewChild('icon2') iconMax: ElementRef;
  constructor(private productService: ProductService, private cartService: CartService,
    @Inject(DOCUMENT) document, private r: Renderer2) { }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data: any) => {
      this.products = data.message;
      this.empanadasArray = this.products.filter(p => {
        return p.type === 'empanada';
      });
      this.iceCreamArray = this.products.filter(p => {
        return p.type === 'helado';
      })
    });
  }
  alertMenu(product) {
    this.productSelected = product;
    if (this.productSelected.type === 'pizza' || this.productSelected.type === 'calzon') {
      this.availableToBuy = true;
    }

    this.alertLaunched = true;
    window.scrollTo(0, 0);
    this.r.addClass(document.body, 'overflow-y-hidden');
    if (this.productSelected) {
      this.alert.nativeElement.classList.remove('hidden');
    }
  }
  quantityIceCream(input) {
    this.maxSelection = false;
    if (input.checked) {
      this.counter++;
    }
    if (!input.checked) {
      this.counter--;
    }

    if ((this.counter <= 4 || this.counter > 0) && this.productSelected.type === '1kg') {
      if (this.counter >= 4) {
        this.maxSelection = true;
      }
      this.availableToBuy = true;
    }
    if ((this.counter <= 3 || this.counter > 0) && this.productSelected.type === '1/2kg') {
      if (this.counter >= 3) {
        this.maxSelection = true;
      }
      this.availableToBuy = true;
    }
    if ((this.counter <= 2 || this.counter > 0) && this.productSelected.type === '1/4kg') {
      if (this.counter >= 2) {
        this.maxSelection = true;
      }
      this.availableToBuy = true;
    }
  }
  addToCart(product) {
    this.counter = 0;
    this.availableToBuy = false;
    this.maxSelection = false;
    for (let i = 0; i < this.quantityProduct; i++) {
      this.cartService.addToCart(product);
    }
    this.closeMenu();
  }
  closeMenu() {
    const input: any = document.getElementsByClassName('iceCreamCheck');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < input.length; i++) {
      input[i].checked = false;
    }
    this.maxSelection = false;
    this.counter = 0;
    this.availableToBuy = false;
    this.alert.nativeElement.classList.add('hidden');
    this.alertLaunched = false;
    this.r.removeClass(document.body, 'overflow-y-hidden');

  }
  inputChange() {
    if (this.quantityProduct > 50) {
      this.quantityProduct = 50;
    }
    if (this.quantityProduct < 0) {
      this.quantityProduct = 0;
    }
  }
  changeQuantity(type) {
    if (type === 'sum') {
      this.quantityProduct++;
      if (this.quantityProduct >= 50) {
        this.quantityProduct = 50;
      }
    }
    if (type === 'minus') {
      this.quantityProduct--;
      if (this.quantityProduct <= 0) {
        this.quantityProduct = 0;
      }
    }
  }
  clickedTag(tagName: HTMLElement, icon: HTMLElement) {
    this.usedFilters = true;
    const maxSpanClass = this.maxSpan.nativeElement.classList.contains('font-bold');
    const LessSpanClass = this.lessSpan.nativeElement.classList.contains('font-bold');

    if (maxSpanClass && !LessSpanClass && tagName.textContent.toLowerCase() === 'menor precio') {
      const index = this.filtersArray.indexOf('mayor precio');
      this.filtersArray.splice(index, 1);
      console.log(this.filtersArray);
      this.maxSpan.nativeElement.className = 'cursor-pointer';
      this.iconMax.nativeElement.className = 'text-gray-400 px-1 tagsText';
    }
    if (LessSpanClass && !maxSpanClass && tagName.textContent.toLowerCase() === 'mayor precio') {
      const index = this.filtersArray.indexOf('menor precio');
      this.filtersArray.splice(index, 1);
      this.lessSpan.nativeElement.className = 'cursor-pointer';
      this.iconLess.nativeElement.className = 'text-gray-400 px-1 tagsText';
    }
    if (tagName.classList.contains('font-bold')) {
      this.manageFilters(tagName.textContent);
      tagName.className = 'cursor-pointer';
      icon.className = 'text-gray-400 px-1 tagsText';
      return;
    }
    icon.className += ' text-green-600';
    tagName.className += ' font-bold text-green-600';
    this.manageFilters(tagName.textContent);
    this.productsFiltered = this.productsFiltered;
  }
  openFilters() {
    if (this.filtersPanel.nativeElement.classList.contains('block')) {
      this.filtersPanel.nativeElement.classList.remove('block');
      this.filtersPanel.nativeElement.classList.add('hidden');
      this.faAngleDownIcon = faAngleDown;
      return;
    }
    this.faAngleDownIcon = faAngleUp;
    this.filtersPanel.nativeElement.classList.add('slide-in-top');
    this.filtersPanel.nativeElement.classList.remove('hidden');
    this.filtersPanel.nativeElement.classList.add('block');
  }
  // tslint:disable-next-line: no-shadowed-variable
  manageFilters(filter: string) {
    filter = filter.toLowerCase();

    if (this.filtersArray.includes(filter)) {
      const index = this.filtersArray.indexOf(filter);
      this.filtersArray.splice(index, 1);
      if (filter === 'helado') {
        this.productsFiltered = this.productsFiltered.filter(p => {
          return p.type !== '1kg' && p.type !== '1/2kg' && p.type !== '1/4kg';
        });
        console.log(this.productsFiltered);
      }
      if (filter === 'empanada') {
        this.productsFiltered = this.productsFiltered.filter(p => {
          return p.type !== 'empanada' && p.type !== 'docena';
        });
      }
      this.productsFiltered = this.productsFiltered.filter(p => {
        return p.type !== filter;
      })
      return this.productsFiltered;
    }
    if (filter === 'menor precio' || filter === ('mayor precio')) {
      this.filtersArray.push(filter);
      return this.priceFilters(filter);
    } else {
      this.filtersArray.push(filter);
      this.typeFilters(filter);
      return this.filtersArray;
    }

  }

  typeFilters(filterText) {
    let tmpArray = [];
    if (this.filtersArray.includes('menor precio') || this.filtersArray.includes('mayor precio')) {
      if (this.productsFiltered === this.products) {
        this.productsFiltered = [];
      }
      let filter;
      if (this.filtersArray.includes('menor precio')) {
        filter = 'menor precio';
      }
      if (this.filtersArray.includes('mayor precio')) {
        filter = 'mayor precio';
      }
      switch (filterText) {
        case 'helado':
          tmpArray = this.products.filter(p => {
            return p.type === '1kg' || p.type === '1/2kg' || p.type === '1/4kg';
          });
          break;
        case 'empanada':
          tmpArray = this.products.filter(p => {
            return p.type === 'empanada' || p.type === 'docena';
          });
          break;
        default:
          tmpArray = this.products.filter(p => {
            return p.type === filterText;
          })
          break;
      }
      tmpArray.forEach(p => {
        if (this.productsFiltered.includes(p)) {
          const index = tmpArray.indexOf(p);
          tmpArray.splice(index, 1);
        }
        this.productsFiltered.push(p);
      });
      return this.priceFilters(filter);
    }

    switch (filterText) {
      case 'helado':
        tmpArray = this.products.filter(p => {
          return p.type === '1kg' || p.type === '1/2kg' || p.type === '1/4kg';
        });
        break;
      case 'empanada':
        tmpArray = this.products.filter(p => {
          return p.type === 'empanada' || p.type === 'docena';
        });
        break;
      default:
        tmpArray = this.products.filter(p => {
          return p.type === filterText;
        })
        break;
    }
    tmpArray.forEach(p => {
      if (this.productsFiltered.includes(p)) {
        const index = tmpArray.indexOf(p);
        tmpArray.splice(index, 1);
      }
      this.productsFiltered.push(p);
    });
  }
  priceFilters(filterText) {
    let tmpArray = [];
    if (filterText === 'menor precio') {
      if (this.productsFiltered.length === 0) {
        tmpArray = this.products;
      } else {
        tmpArray = this.productsFiltered;
      }
      this.productsFiltered = tmpArray.sort((a, b) => {
        return a.price - b.price;
      });
    } else {
      if (this.productsFiltered.length === 0) {
        tmpArray = this.products;
      } else {
        tmpArray = this.productsFiltered;
      }
      this.productsFiltered = tmpArray.sort((a, b) => {
        return b.price - a.price;
      });
    }
  }
}
