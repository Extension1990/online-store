import { Component, inject, signal } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { RouterLink } from '@angular/router';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { FormErrors } from '../../shared/components/form-errors/form-errors';
import { Store } from '@ngrx/store';
import { authActions } from '../../shared/store/auth-actions';
import { authFeatures } from '../../shared/store/auth-feature';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [Button, RouterLink, FormField, FormsModule, FormErrors],
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

  private readonly store = inject(Store);
  protected readonly isLoading = toSignal(this.store.select(authFeatures.selectIsLoading));

  login(event: Event) {
    event.preventDefault();
    if(this.loginForm().valid()) {
       this.store.dispatch(authActions.login(this.loginForm().value()));
    } else {
      console.log('Login form invalid!');
    }
  }
}
