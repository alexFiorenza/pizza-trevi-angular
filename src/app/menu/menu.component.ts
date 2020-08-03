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
        name: 'Napolitana'
      },
      {
        price: 600,
        type: 'Pizzas',
        name: 'Muzarella'
      },
      {
        price: 290,
        type: 'Helados',
        name: 'Frutilla a la crema'
      },
      {
        price: 100,
        type: 'Helados',
        name: 'Chocolate'
      },
      {
        price: 600,
        type: 'Calzones',
        name: 'Primavera'
      },
      {
        price: 300,
        type: 'Empanadas',
        name: 'Carne'
      },
      {
        price: 300,
        type: 'Empanadas',
        name: 'Jamon y queso'
      }
    ];

  }
  clickedTag(tagName: HTMLElement, icon: HTMLElement) {
    const maxSpanClass = this.maxSpan.nativeElement.classList.contains('font-bold');
    const LessSpanClass = this.lessSpan.nativeElement.classList.contains('font-bold');

    if (maxSpanClass && !LessSpanClass && tagName.textContent === 'Menor precio') {
      this.maxSpan.nativeElement.className = 'cursor-pointer';
      this.iconMax.nativeElement.className = 'text-gray-400 px-1 tagsText';
    }
    if (LessSpanClass && !maxSpanClass && tagName.textContent === 'Mayor precio') {
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
  manageFilters(filter: string) {
    if (filter === 'Menor precio' || this.filtersArray.includes('Mayor precio')) {
      const index = this.filtersArray.indexOf(filter);
      this.filtersArray.splice(index, 1);
    }
    if (this.filtersArray.includes(filter)) {
      const index = this.filtersArray.indexOf(filter);
      this.filtersArray.splice(index, 1);
      this.productsFiltered = this.productsFiltered.filter(p => {
        return p.type !== filter;
      });
      console.log(this.productsFiltered);
      return;
    } else {
      this.filtersArray.push(filter);
      this.applyChecks(filter);
      return this.filtersArray;
    }
  }

  /*TODO  finish price  filters*/
  applyChecks(filterText) {

    if (filterText !== 'Menor precio' || filterText !== 'Mayor precio') {
      let tmpArray = [];
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
    }
  }
}
