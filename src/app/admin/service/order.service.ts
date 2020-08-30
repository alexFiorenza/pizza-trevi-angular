import { UserService } from './../../users-panel/services/user.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = environment.api;
  constructor(private _http: HttpClient, private userService: UserService) { }
  getAllOrders() {
    const token = this.userService.getToken();
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this._http.get(`${this.url}order`, { headers });
  }
}
