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
  auth: boolean = false;
  userLogin: User = { id: 1, user: 'ze', password: '123' };

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

  userAuth(user: Partial<User>): boolean {
    //   for (let u of this.users) {
    //     if (user.user == u.user && user.password == u.password) {
    //       return (this.auth = true);
    //     }
    //   }
    //   return (this.auth = false);
    // }
    if (user.user == 'ze' && user.password == '123') {
      return (this.auth = true);
    }else{
      return (this.auth = false);
    }
  }
}
