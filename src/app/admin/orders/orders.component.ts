import { OrderService } from './../service/order.service';
import { SocketioService } from './../../sockets/socketio.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Orders } from 'src/app/interfaces/orders';
import {
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public orders: Array<Orders> = [];
  faTimesCircle = faTimesCircle;
  actualProduct: Orders;
  delayTime = 0;
  orderAudio: HTMLAudioElement;
  constructor(private socket: SocketioService, private orderService: OrderService) { }
  @ViewChild('alert') public alertContainer: ElementRef;
  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((data: any) => {
      this.orders = data.message;
    });
    this.socket.setUpSocketConnection();
    this.socket.socket.on('orderCreatedAdmin', (d: Orders) => {
      this.orderAudio = new Audio('../../../assets/new-order-sound.mp3');
      this.orderAudio.play();
      this.orders.push(d);
    });
  }
  openAlert(order) {
    this.alertContainer.nativeElement.classList.remove('hidden');
    this.actualProduct = order;
    console.log(this.actualProduct)
    if (this.orderAudio) {
      this.orderAudio.pause();

    }
  }
  completeOrder(order) {
    this.alertContainer.nativeElement.classList.add('hidden');
    const i = this.orders.indexOf(order);
    this.actualProduct.status = 'completado';
    this.orders.splice(i, 1);
    this.socket.emitAdminResponse(this.actualProduct);
  }
  confirmOrder(confirm = true, order = null) {
    if (confirm) {
      // tslint:disable-next-line: radix
      Object.assign(this.actualProduct, { time: this.delayTime });
      this.actualProduct.status = 'activo';
      this.alertContainer.nativeElement.classList.add('hidden');
      this.socket.emitAdminResponse(this.actualProduct);
    } else {
      this.actualProduct.status = 'rechazado';
      this.alertContainer.nativeElement.classList.add('hidden');
      const i = this.orders.indexOf(order);
      this.orders.splice(i, 1);
      this.socket.emitAdminResponse(this.actualProduct);
      window.location.reload();
    }
  }
}
