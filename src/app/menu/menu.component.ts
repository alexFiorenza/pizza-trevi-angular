import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ElementRef } from '@angular/core';
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
  filter: string;
  @ViewChild('filters') filtersPanel: ElementRef;
  constructor() { }

  ngOnInit(): void {
    this.products = [
      {
        price: 400,
      },
      {
        price: 290,
      },
      {
        price: 100,
      },
      {
        price: 600,
      },
    ];
  }
  clickedTag(tagName: HTMLElement, icon: HTMLElement) {
    if (tagName.classList.contains('font-bold')) {
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
      console.log('entered');
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
    this.filter = filter;
    if (filter === 'Menor precio') {
      const priceArray = [];
      this.products.forEach(product => {
        priceArray.push(product.price);
      });
      priceArray.sort((a, b) => {
        return a - b;
      });
      return console.log(priceArray);
    }
    if (filter === ' Mayor precio') {
      const priceArray = [];
      this.products.forEach(product => {
        priceArray.push(product.price);
      });
      priceArray.sort((a, b) => {
        return b - a;
      });
      return console.log(priceArray);
    }
  }
}
