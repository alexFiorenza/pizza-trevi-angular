import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faAngleDown, faSearch, faTimesCircle, faCircle, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  faAngleDownIcon = faAngleDown;
  faSearch = faSearch;
  faCircle = faCircle;
  faTimesCircle = faTimesCircle;
  products: any[];
  productsFiltered: any[] = [];
  filtersArray: string[] = [];
  @ViewChild('filters') filtersPanel: ElementRef;
  @ViewChild('maxprice') maxSpan: ElementRef;
  @ViewChild('lessprice') lessSpan: ElementRef;
  @ViewChild('icon1') iconLess: ElementRef;
  @ViewChild('icon2') iconMax: ElementRef;
  constructor() { }

  ngOnInit(): void {

    this.products = [
      {
        price: 400,
        type: 'Pizzas',
        name: 'Napolitana',
        available: true,
        hot: false,
      },
      {
        price: 600,
        type: 'Pizzas',
        name: 'Muzarella',
        available: false,
        hot: false,
      },
      {
        price: 290,
        type: 'Helados',
        name: 'Frutilla a la crema',
        available: true,
        hot: true,
      },
      {
        price: 100,
        type: 'Helados',
        name: 'Chocolate',
        available: true,
        hot: true,
      },
      {
        price: 600,
        type: 'Calzones',
        name: 'Primavera',
        available: false,
        hot: true,
      },
      {
        price: 300,
        type: 'Empanadas',
        name: 'Carne',
        available: false,
        hot: true,
      },
      {
        price: 300,
        type: 'Empanadas',
        name: 'Jamon y queso',
        available: false,
        hot: false,
      }
    ];

  }
  clickedTag(tagName: HTMLElement, icon: HTMLElement) {
    const maxSpanClass = this.maxSpan.nativeElement.classList.contains('font-bold');
    const LessSpanClass = this.lessSpan.nativeElement.classList.contains('font-bold');

    if (maxSpanClass && !LessSpanClass && tagName.textContent === 'Menor precio') {
      const index = this.filtersArray.indexOf('Mayor precio');
      this.filtersArray.splice(index, 1);
      this.maxSpan.nativeElement.className = 'cursor-pointer';
      this.iconMax.nativeElement.className = 'text-gray-400 px-1 tagsText';
    }
    if (LessSpanClass && !maxSpanClass && tagName.textContent === 'Mayor precio') {
      const index = this.filtersArray.indexOf('Menor precio');
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
    console.log(this.filtersArray);
    if (this.filtersArray.includes(filter)) {
      const index = this.filtersArray.indexOf(filter);
      this.filtersArray.splice(index, 1);

      this.productsFiltered = this.productsFiltered.filter(p => {
        if (filter === 'Disponibles') {
          return p.available && !p.available;
        }
        if (filter === 'Más vendidas') {
          return p.hot && !p.hot;
        }
        return p.type !== filter;
      });
      return;
    }
    if (filter === 'Menor precio' || filter === ('Mayor precio') || filter === 'Disponibles' || filter === 'Más vendidas') {
      this.filtersArray.push(filter);
      return this.otherFilters(filter);
    } else {
      this.filtersArray.push(filter);
      this.applyChecks(filter);
      return this.filtersArray;
    }
  }

  /*TODO  finish price  filters*/
  applyChecks(filterText) {
    let tmpArray = [];
    if (this.filtersArray.includes('Menor precio') || this.filtersArray.includes('Mayor precio')
      || this.filtersArray.includes('Disponibles') || this.filtersArray.includes('Más vendidas')) {
      if (this.productsFiltered === this.products) {
        this.productsFiltered = [];
      }
      let filter;
      if (this.filtersArray.includes('Menor precio')) {
        filter = 'Menor precio';
      }
      if (this.filtersArray.includes('Más vendidas')) {
        filter = 'Más vendidas';
      }
      if (this.filtersArray.includes('Disponibles')) {
        filter = 'Disponibles';
      } else {
        filter = 'Mayor precio';
      }
      tmpArray = this.products.filter(p => {
        if (filterText !== 'Más vendidas' || filterText !== 'Disponibles') {
          return p.type === filterText;
        }
      });
      tmpArray.forEach(p => {
        if (this.productsFiltered.includes(p)) {
          const index = tmpArray.indexOf(p);
          tmpArray.splice(index, 1);
        }
        this.productsFiltered.push(p);
      });
      return this.otherFilters(filter);
    }
    tmpArray = this.products.filter(p => {
      if (filterText !== 'Más vendidas' || filterText !== 'Disponibles') {
        return p.type === filterText;
      }
    });
    tmpArray.forEach(p => {
      if (this.productsFiltered.includes(p)) {
        const index = tmpArray.indexOf(p);
        tmpArray.splice(index, 1);
      }
      this.productsFiltered.push(p);
    });
    console.log(this.productsFiltered);
  }
  otherFilters(filterText) {
    let tmpArray = [];
    if (filterText === 'Menor precio') {
      if (this.productsFiltered.length === 0) {
        tmpArray = this.products;
      } else {
        tmpArray = this.productsFiltered;
      }
      this.productsFiltered = tmpArray.sort((a, b) => {
        return a.price - b.price;
      });
      return this.productsFiltered;
    }
    if (filterText === 'Mayor precio') {
      if (this.productsFiltered.length === 0) {
        tmpArray = this.products;
      } else {
        tmpArray = this.productsFiltered;
      }
      this.productsFiltered = tmpArray.sort((a, b) => {
        return b.price - a.price;
      });
    }
    if (filterText === 'Disponibles') {
      if (this.productsFiltered.length === 0) {
        tmpArray = this.products;
      } else {
        tmpArray = this.productsFiltered;
      }
      this.productsFiltered = tmpArray.filter(p => {
        return p.available;
      });
      return this.productsFiltered;
    }
    if (filterText === 'Más vendidas') {
      if (this.productsFiltered.length === 0) {
        tmpArray = this.products;
      } else {
        tmpArray = this.productsFiltered;
      }
      this.productsFiltered = tmpArray.filter(p => {
        return p.hot;
      });
      return this.productsFiltered;
    }
  }
}