import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly API = 'http://localhost:3000';
  users: User[] = [];
  auth: string = '';
  userLogin: User[] = [
    { id: 1, user: '2023', password: '2023', role: 'user' },
    { id: 2, user: '564', password: '123456', role: 'adm' },
  ];

  constructor(private http: HttpClient) {
    //this.getAll();
  }

  getAll() {
    this.http
      .get<User[]>(`${this.API}/users`)
      .pipe(first())
      .subscribe((user: User[]) => {
        this.users = user;
      });
  }

  userAuth(user: Partial<User>): string {
    if (user.user === '2023' && user.password === '2023') {
      this.auth = 'user'
      return this.auth;
    }
    if (user.user === '564' && user.password === '123456') {
      this.auth = 'adm'
      return this.auth;
    }
    return '';
  }
}
