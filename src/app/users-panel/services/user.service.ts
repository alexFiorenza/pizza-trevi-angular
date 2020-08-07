import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
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
  decodeToken(token) {
    return this.jwt.decodeToken(token);
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
