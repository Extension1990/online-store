import { Component, inject, signal } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { RouterLink } from '@angular/router';
import { form, FormField, minLength, required, validate } from '@angular/forms/signals';
import { FormErrors } from '../../shared/components/form-errors/form-errors';
import { matchFields } from '../../shared/validators/match-fields';
import { FormsModule } from '@angular/forms';
import { registerSchema } from './register-schema';
import { Store } from '@ngrx/store';
import { authFeatures } from '../../shared/store/auth-feature';
import { toSignal } from '@angular/core/rxjs-interop';
import { authActions } from '../../shared/store/auth-actions';

@Component({
  selector: 'app-register',
  imports: [Button, RouterLink, FormErrors, FormField, FormsModule],
  templateUrl: './register.html',
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-200 p-4',
  },
  styleUrl: './register.css',
})
export class Register {
  registerModel = signal({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  registerForm = form(this.registerModel, registerSchema);
  private readonly store = inject(Store);
  protected readonly isLoading = toSignal(this.store.select(authFeatures.selectIsLoading))

  register(event: Event) {
    event.preventDefault();
    const id = Date.now();
    const {confirmPassword, ...rest} = this.registerForm().value();
    const registerRequest = {id, ...rest};
    this.store.dispatch(authActions.register(registerRequest));
  }
}
