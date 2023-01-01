import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  userAuth: boolean = false;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService
  ) {
    this.form = this.formBuilder.group({
      user: ['ze'],
      password: ['123'],
    });
  }

  onSubmit() {
    this.userAuth = this.loginService.userAuth(this.form.value);
    if (this.userAuth) {
      this.router.navigate(['blocos']);
    } else {
      this.onError();
    }
  }

  clear() {
    this.form.setValue({ user: '', password: '' });
  }

  onError() {
    this.snackBar.open('Usuário ou senha inválidos!', 'X', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
