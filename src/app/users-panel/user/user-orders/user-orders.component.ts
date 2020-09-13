import { OrderService } from './../../../admin/service/order.service';
import { UserService } from './../../services/user.service';
import { SocketioService } from './../../../sockets/socketio.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Orders } from 'src/app/interfaces/orders';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {
  userData: Partial<User>;
  actualOrders: Array<Orders> = [];
  updatingData = true;
  constructor(private socket: SocketioService, private user: UserService, private orders: OrderService) {

  }

  ngOnInit(): void {
    this.userData = this.user.getUserData();
    this.orders.getInProgressOrder(this.userData._id).subscribe((p: any) => {
      this.actualOrders = p.message;
      this.updatingData = false;
      this.socket.setUpSocketConnection();
      this.socket.socket.on('updatedOrder', (data) => {
        if (data.user._id === this.userData._id) {
          console.log(data);
          this.actualOrders.forEach(p => {
            if (p._id == data._id) {
              p.status = data.status;
              Object.assign(p, { time: data.time });
            }
          })
        }
      });
    });

  }

}
