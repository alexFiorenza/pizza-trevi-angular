import { SocketioService } from './../../sockets/socketio.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public orders: Array<any> = [];
  constructor(private socket: SocketioService) { }

  ngOnInit(): void {
    this.socket.setUpSocketConnection();
    this.socket.socket.on('orderCreatedAdmin', (d) => {
      this.orders.push(d);
      console.log(this.orders);
    });
  }

}
