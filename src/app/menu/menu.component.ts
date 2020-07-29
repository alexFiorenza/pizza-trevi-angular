import { Component, OnInit } from '@angular/core';
import { faAngleDown, faSearch, faTimesCircle, faCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  faAngleDown = faAngleDown;
  faSearch = faSearch;
  faCircle = faCircle;
  faTimesCircle = faTimesCircle;
  constructor() { }

  ngOnInit(): void {
  }

}
