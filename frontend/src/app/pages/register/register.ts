import { Component } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [Button, RouterLink],
  templateUrl: './register.html',
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-200 p-4'
  },
  styleUrl: './register.css',
})
export class Register {
  
}
