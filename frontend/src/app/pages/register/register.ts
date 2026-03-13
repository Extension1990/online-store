import { Component, signal } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { RouterLink } from '@angular/router';
import { form, FormField, minLength, required, validate } from '@angular/forms/signals';
import { FormErrors } from '../../shared/components/form-errors/form-errors';
import { matchFields } from '../../shared/validators/match-fields';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [Button, RouterLink, FormErrors, FormField, FormsModule],
  templateUrl: './register.html',
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-200 p-4'
  },
  styleUrl: './register.css',
})
export class Register {
  registerModel = signal({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  registerForm = form(this.registerModel, (rootPath) => {
    required(rootPath.username, {message: 'Username is required.'});
    required(rootPath.email, {message: 'Email is required.'});
    required(rootPath.password, {message: 'Password is required.'});
    required(rootPath.confirmPassword, {message: 'Confirmation password is required.'});
    minLength(rootPath.password, 6, {message: 'Password must be atleast 6 characters long.'});
    
    validate(rootPath.confirmPassword, ({value, valueOf}) => {
      const password = valueOf(rootPath.password);
      const confirmPassword = value();

      if(!password) {
        return null;
      }

      if(password !== confirmPassword) {
        return {
          kind: 'passwordMismatch',
          message: 'Passwords do not match.'
        }
      }

      return null;
    });
  });

  register(event: Event) {
    event.preventDefault();
    if(this.registerForm().valid()) {
       console.log('Register Data', this.registerForm().value());
    } else {
      console.log('Register form invalid!');
    }
  }
}
