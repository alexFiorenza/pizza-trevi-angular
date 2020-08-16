import { CartService } from './../shared/cart.service';
import { ProductService } from './../admin/service/product.service';
import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import {
  faAngleDown, faSearch, faTimesCircle,
  faCircle, faAngleUp, faPlusSquare, faMinusSquare, faPlus
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Product } from '../interfaces/product';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, DoCheck {
  filterProduct = '';
  faAngleDownIcon = faAngleDown;
  faSearch = faSearch;
  faCircle = faCircle;
  faTimesCircle = faTimesCircle;
  faPlusSquare = faPlusSquare;
  faMinusSquare = faMinusSquare;
  products: any[];
  empanadasArray;
  productSelected: Partial<Product>;
  productsFiltered: any[] = [];
  filtersArray: string[] = [];
  usedFilters = false;
  quantityProduct = 1;
  @ViewChild('alertContainer') alert: ElementRef;
  @ViewChild('filters') filtersPanel: ElementRef;
  @ViewChild('maxprice') maxSpan: ElementRef;
  @ViewChild('lessprice') lessSpan: ElementRef;
  @ViewChild('icon1') iconLess: ElementRef;
  @ViewChild('icon2') iconMax: ElementRef;
  constructor(private productService: ProductService, private cartService: CartService) { }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data: any) => {
      this.products = data.message;
      this.empanadasArray = this.products.filter(p => {
        return p.type === 'empanada';
      })
    });
  }
  alertMenu(product) {
    this.productSelected = product;
    if (this.productSelected) {
      this.alert.nativeElement.classList.remove('hidden');
    }
  }
  ngDoCheck() {
    // console.log(this.productsFiltered);
  }
  addToCart(product) {
    for (let i = 0; i < this.quantityProduct; i++) {
      this.cartService.addToCart(product);
    }
    this.closeMenu();
  }
  closeMenu() {
    this.alert.nativeElement.classList.add('hidden');
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
