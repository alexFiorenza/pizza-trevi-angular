import { SeoService } from './../../../SEO/seo.service';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faUser, faUserEdit, faReceipt, faHistory, faUserMinus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';

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
  deletingUser;
  @ViewChild('alertContainer') private alert: ElementRef;
  @ViewChild('deleteAccountAlert') private deleteAlert: ElementRef;
  constructor(private userService: UserService, private route: Router, private title: Title, private seo: SeoService) { }
  ngOnInit(): void {
    const title = 'Mis datos de Pizza in Trevi';
    this.title.setTitle(title);
    this.seo.generateTags({ description: 'Actualiza tus datos de Pizza in Trevi en caso de que estos no sean correctos, conoce tus pedidos actuales y los que se pidieron' })
    this.deletingUser = false;
  }
  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('dataUser');
    window.location.reload();
  }
  openAlert(deleteAccount = false) {
    if (!deleteAccount) {
      this.alert.nativeElement.classList.remove('hidden');
      this.alert.nativeElement.classList.add('flex');
    } else {
      this.deleteAlert.nativeElement.classList.remove('hidden');
      this.deleteAlert.nativeElement.classList.add('flex');
    }
  }

  closeAlert(deleteAccount = false) {
    if (!deleteAccount) {
      this.alert.nativeElement.classList.add('hidden');
    } else {
      this.deleteAlert.nativeElement.classList.add('hidden');
    }
  }
  deleteAccount() {
    this.deletingUser = true;
    this.userService.deleteUser().subscribe((r: any) => {
      if (r.ok) {
        this.route.navigate(['/home']);
        this.signOut();
      }
    });
  }
}
