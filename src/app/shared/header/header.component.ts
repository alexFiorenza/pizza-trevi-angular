import { CartService } from './../cart.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { UserService } from './../../users-panel/services/user.service';
import {
  faBars, faPizzaSlice, faTimes, faHome,
  faShoppingCart, faAddressCard, faUser, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  productCart = [];
  $total: Observable<number>;
  faBars = faBars;
  faTimes = faTimes;
  faUser = faUser;
  faHome = faHome;
  faPizzaSlice = faPizzaSlice;
  faAddressCard = faAddressCard;
  faShoppingCart = faShoppingCart;
  faSignOutAlt = faSignOutAlt;
  receivedData = false;
  userData: any = false;

  constructor(private userService: UserService, private cartService: CartService) { }

  ngOnInit(): void {
    this.$total = this.cartService.cart$.pipe(map(p => p.length));
    if (localStorage.getItem('dataUser')) {
      this.receivedData = true;
      const user = this.userService.getUserData();
      this.userData = user;

    } else {
      this.receivedData = false;
    }
  }
  ngOnChanges() {
    console.log('There was a change');
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
  signOutIcon() {

    localStorage.removeItem('token');
    localStorage.removeItem('dataUser');
    window.location.reload();
  }
}
