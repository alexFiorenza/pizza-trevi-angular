import { CartComponent } from './../cart.component';
import { UserService } from './../../../users-panel/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  userData: Partial<User>;
  constructor(private userService: UserService, private cartComponent: CartComponent) { }

  ngOnInit(): void {
    if (this.cartComponent.steps === 1) {
      this.userData = this.userService.getUserData();
    } else {
      window.location.reload();
    }
  }

}
