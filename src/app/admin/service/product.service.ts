import { UserService } from './../../users-panel/services/user.service';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient, private userService: UserService) { }
  uploadProduct(body, image: '') {
    const token = this.userService.getToken();
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this._http.post(`${environment.api}product`, body, { headers });
  }
  getAllProducts() {
    return this._http.get(`${environment.api}products`);
  }
  deleteProduct(id) {
    const token = this.userService.getToken();
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this._http.delete(`${environment.api}product/${id}`, { headers });
  }
}
