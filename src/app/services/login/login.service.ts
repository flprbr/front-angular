import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../../features/auth/types/login-response.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiNewUrl + 'auth';

  constructor(private httpClient: HttpClient) { }

  login(user: string, password: string) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, { user, password }).pipe(
      tap((value) => {
        sessionStorage.setItem('auth-token', value.token);
        sessionStorage.setItem('username', value.usuario);
      })
    );
  }

  signup(username: string, password: string, fullName: string, role: string, cpf?: string, canSign?: boolean) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/register`, { username, password, fullName, role, cpf, canSign }).pipe(
      tap((value) => {
        sessionStorage.setItem('auth-token', value.token);
        sessionStorage.setItem('username', value.usuario);
      })
    );
  }
}
