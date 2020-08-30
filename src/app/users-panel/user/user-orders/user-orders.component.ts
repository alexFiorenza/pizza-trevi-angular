import { UserService } from './../../services/user.service';
import { SocketioService } from './../../../sockets/socketio.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {
  userData: Partial<User>;
  constructor(private socket: SocketioService, private user: UserService) {

  }

  ngOnInit(): void {
    this.userData = this.user.getUserData();
    this.socket.setUpSocketConnection();
    this.socket.socket.on('updatedOrder', (data) => {
      if (data.user._id === this.userData._id) {
        console.log(data);
      }
    });
  }

}
