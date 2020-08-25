import { Component, OnInit } from '@angular/core';
import { faUser, faUserEdit, faReceipt, faHistory, faUserMinus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
})
export class UserPanelComponent implements OnInit {
  faUser = faUser;
  faUserEdit = faUserEdit;
  faReceipt = faReceipt;
  faHistory = faHistory;
  faUserMinus = faUserMinus;
  faSignOutAlt = faSignOutAlt;
  constructor() { }
  ngOnInit(): void {

  }

}
