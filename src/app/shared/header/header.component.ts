import { faBars, faAd, faPizzaSlice, faTimes, faHome, faShoppingCart, faAddressCard, faUser } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faBars = faBars;
  faTimes = faTimes;
  faUser = faUser;
  faHome = faHome;
  faPizzaSlice = faPizzaSlice;
  faAddressCard = faAddressCard;
  faShoppingCart = faShoppingCart;
  constructor() { }

  ngOnInit(): void {
  }
  openMenu() {
    const menuBar = document.getElementById('mobileMenu');
    if (menuBar.classList.contains('flex')) {
      menuBar.classList.remove('flex');
      menuBar.classList.add('hidden');
    } else {
      menuBar.classList.add('flex');
      menuBar.classList.remove('hidden');
    }
  }
}
