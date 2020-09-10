import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientModule, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private DevUrl = environment.api;
  constructor(private _http: HttpClient) { }
  private jwt = new JwtHelperService();
  logInUser(body: Partial<User>): Observable<any> {
    return this._http.post(`${this.DevUrl}login`, body).pipe(catchError(this.errorHandler));
  }
  registerUser(body: User) {
    return this._http.post(`${this.DevUrl}register`, body).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  saveToken(token) {
    const dataToken = this.jwt.decodeToken(token);
    localStorage.setItem('dataUser', JSON.stringify(dataToken));
    localStorage.setItem('token', JSON.stringify(token));
  }
  reloadToken(data) {
    return this._http.post(`${this.DevUrl}token`, data);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getUserData() {
    const userData = localStorage.getItem('dataUser');
    const parsedData = JSON.parse(userData);
    return parsedData;
  }
  updateUser(data): Observable<any> {
    const token = this.getToken();
    const user: Partial<User> = this.getUserData();
    const headers = new HttpHeaders().set('Authorization', token);
    return this._http.put(`${this.DevUrl}user/${user._id}`, data, { headers });
  }
  isTokenExpired() {
    const token = this.getToken();
    if (token !== null) {
      const tokenValidation = this.jwt.isTokenExpired(token);
      return tokenValidation;
    }
    return false;
  }
}
