import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private DevUrl = environment.api;
  constructor(private _http: HttpClient) { }

  logInUser(body: Partial<User>): Observable<any> {
    return this._http.post(`${this.DevUrl}login`, body);
  }

}
