import { UserService } from './../../services/user.service';
import { OrderService } from './../../../admin/service/order.service';
import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/interfaces/orders';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})
export class UserHistoryComponent implements OnInit {
  orders: Array<Orders> = [];
  constructor(private orderService: OrderService, private userService: UserService) { }

  ngOnInit(): void {
    const userData: User = this.userService.getUserData();

    this.orderService.getHistoryUser(userData._id).subscribe((data: any) => {
      this.orders = data.message;
    })
  }

}
