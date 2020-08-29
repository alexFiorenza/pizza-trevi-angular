import { SocketioService } from './../../sockets/socketio.service';
import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/interfaces/orders';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public orders: Array<Orders> = [];
  constructor(private socket: SocketioService) { }

  ngOnInit(): void {
    this.orders = [
      {

        date: new Date(),
        instructions: 'not set yet',
        products: [{
          available: true,
          description: 'Helado de 1kg ',
          flavors: ['frutilla ', 'Chocolate marroc ', 'almendrado', 'tramontana'],
          image: null,
          name: 'Helado de 1KG',
          price: 390,
          top: false,
          type: '1kg',
          __v: 0,
          _id: '5f3981dc2d2e611bb0b243b0'
        }],
        status: 'pendiente',
        total: 390,
        user: {
          direction: 'Gral.Frias 333',
          email: 'alexfiorenza2012@gmail.com',
          extraInfo: 'colombres y garona ',
          name: 'Alex Fiorenza ',
          phone: 1553158926,
          role: 'USER',
          _id: '5f41bfae48b8aa5a441f8479',
        },
        _id: 'asdadsadasdads'
      }
    ];
    // this.socket.setUpSocketConnection();
    // this.socket.socket.on('orderCreatedAdmin', (d: Orders) => {
    //   this.orders.push(d);
    //   console.log(this.orders);
    // });
  }
}
