import { CartService } from './../shared/cart.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket;
  constructor(private cartService: CartService) { }
  setUpSocketConnection() {
    this.socket = io(environment.url);
  }


}
