import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = 'http://192.168.1.165:8080/api/auth/login';

  constructor(private httpClient: HttpClient) { }

  login(user: string, password: string) {
    return this.httpClient.post<LoginResponse>(this.apiUrl, { user, password }).pipe(
      tap((value) => {
        sessionStorage.setItem('auth-token', value.token);
        sessionStorage.setItem('username', value.usuario);

      })
    )

  }

  Signup(user: string, password: string) {
    return this.httpClient.post<LoginResponse>(this.apiUrl, { user, password }).pipe(
      tap((value) => {
        sessionStorage.setItem('auth-token', value.token);
        sessionStorage.setItem('username', value.usuario);

      })
    )

  }
}
