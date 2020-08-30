import { OrderService } from './../service/order.service';
import { SocketioService } from './../../sockets/socketio.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Orders } from 'src/app/interfaces/orders';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public orders: Array<Orders> = [];
  actualProduct: Orders;
  delayTime;
  constructor(private socket: SocketioService, private orderService: OrderService) { }
  @ViewChild('alert') private alertContainer: ElementRef;
  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((data: any) => {
      this.orders = data.message;
      console.log(this.orders);
    });
    // this.orders = [
    //   {

    //     date: new Date(),
    //     instructions: 'not set yet',
    //     products: [{
    //       available: true,
    //       description: 'Helado de 1kg ',
    //       flavors: ['frutilla ', 'Chocolate marroc ', 'almendrado', 'tramontana'],
    //       image: null,
    //       name: 'Helado de 1KG',
    //       price: 390,
    //       top: false,
    //       type: '1kg',
    //       __v: 0,
    //       _id: '5f3981dc2d2e611bb0b243b0'
    //     },
    //     {
    //       available: true,
    //       description: 'Helado de 1kg ',
    //       flavors: ['frutilla ', 'Chocolate marroc ', 'almendrado', 'tramontana'],
    //       image: null,
    //       name: 'Helado de 1KG',
    //       price: 390,
    //       top: false,
    //       type: '1kg',
    //       __v: 0,
    //       _id: '5f3981dc2d2e611bb0b243b0'
    //     }],
    //     status: 'pendiente',
    //     total: 390,
    //     user: {
    //       direction: 'Gral.Frias 333',
    //       email: 'alexfiorenza2012@gmail.com',
    //       extraInfo: 'colombres y garona ',
    //       name: 'Alex Fiorenza ',
    //       phone: 1553158926,
    //       role: 'USER',
    //       _id: '5f41bfae48b8aa5a441f8479',
    //     },
    //     _id: 'asdadsadasdads'
    //   }
    // ];
    // this.actualProduct = this.orders[0];
    this.socket.setUpSocketConnection();
    this.socket.socket.on('orderCreatedAdmin', (d: Orders) => {
      this.orders.push(d);
      console.log(this.orders);
    });
  }
  openAlert(order) {
    this.alertContainer.nativeElement.classList.remove('hidden');
    this.actualProduct = order;
  }
  confirmOrder(confirm = true) {
    if (confirm) {
      console.log(this.delayTime);
      this.socket.emitAdminResponse(this.actualProduct);
    } else {
      this.actualProduct.status = 'rechazado';
      this.socket.emitAdminResponse(this.actualProduct);
    }

  }
}
