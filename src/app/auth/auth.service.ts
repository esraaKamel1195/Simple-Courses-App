import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    // return this.http.post<User>("/api/login", { email, password });
    return this.http.post<User>('http://localhost:9000/api/login', {
      email: email,
      password: password,
    });
  }
}
