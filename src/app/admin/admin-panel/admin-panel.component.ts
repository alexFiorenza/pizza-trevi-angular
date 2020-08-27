import { SocketioService } from '../../sockets/socketio.service';
import { Component, OnInit } from '@angular/core';
import { faPizzaSlice, faReceipt, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  faPizzaSlice = faPizzaSlice;
  faReceipt = faReceipt;
  faLeft = faArrowCircleLeft;
  constructor(private socket: SocketioService) { }

  ngOnInit(): void {

  }

}
