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
    const crossBar = document.getElementById('crossMenu');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    if (menuBar.classList.contains('block')) {
      hamburgerMenu.classList.add('block');
      hamburgerMenu.classList.remove('hidden');
      crossBar.classList.add('remove');
      menuBar.classList.remove('block');
      crossBar.classList.add('hidden');
      menuBar.classList.add('hidden');
    } else {
      hamburgerMenu.classList.add('hidden');
      hamburgerMenu.classList.remove('block');
      crossBar.classList.add('block');
      menuBar.classList.add('block');
      menuBar.classList.remove('hidden');
      crossBar.classList.remove('hidden')
    }
  }
}
