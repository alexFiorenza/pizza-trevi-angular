import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  userData: Partial<User>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userData = this.userService.getUserData();
  }

}
