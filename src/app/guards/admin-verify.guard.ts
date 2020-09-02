import { UserService } from './../users-panel/services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AdminVerifyGuard implements CanActivate {
  constructor(private userService: UserService, private route: Router) {

  }
  canActivate() {
    const userData: User = this.userService.getUserData();
    if (userData.role === 'ADMIN') {
      return true;
    } else {
      this.route.navigate(['/home']);
      return false;
    }
  }

}
