import { UserService } from './../users-panel/services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class CheckUserGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {

  }
  canActivate(
  ) {
    const token = this.userService.getToken();
    if (token === null) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
