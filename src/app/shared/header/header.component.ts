import { UserService } from './../../users-panel/services/user.service';
import { faBars, faPizzaSlice, faTimes, faHome, faShoppingCart, faAddressCard, faUser } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input } from '@angular/core';
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
  receivedData = false;
  userData: any = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (localStorage.getItem('dataUser')) {
      this.receivedData = true;
      const user = this.userService.getUserData();
      this.userData = user;
    } else {
      this.receivedData = false;
    }
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
