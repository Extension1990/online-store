import { Component, signal } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { RouterLink } from '@angular/router';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [Button, RouterLink, FormField, FormsModule],
  templateUrl: './login.html',
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-200 p-4'
  },
  styleUrl: './login.css',
})
export class Login {
  loginModel = signal({
    username: '',
    password: ''
  });

  loginForm = form(this.loginModel, (rootPath) => {
    required(rootPath.username, {message: 'Username is required.'});
    required(rootPath.password, {message: 'Password is required.'});
    minLength(rootPath.password, 6, {message: 'Password must be atleast 6 characters long.'})
  });

  login(event: Event) {
    event.preventDefault();
    if(this.loginForm().valid()) {
       console.log('Login Data', this.loginForm().value());
    } else {
      console.log('Login form invalid!');
    }
  }
}
