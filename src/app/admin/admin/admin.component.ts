import { Component, OnInit } from '@angular/core';
import { faPizzaSlice, faReceipt, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  faPizzaSlice = faPizzaSlice;
  faReceipt = faReceipt;
  faLeft = faArrowCircleLeft;
  constructor() { }

  ngOnInit(): void {
  }

}
