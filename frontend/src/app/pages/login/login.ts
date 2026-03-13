import { Component } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [Button, RouterLink],
  templateUrl: './login.html',
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-200 p-4'
  },
  styleUrl: './login.css',
})
export class Login {
  
}
