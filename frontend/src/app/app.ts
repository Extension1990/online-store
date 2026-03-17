import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgToastComponent } from 'ng-angular-popup';
import { cartActions } from './pages/cart/store/cart-actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgToastComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  private readonly store = inject(Store);
  protected readonly title = signal('frontend');

  ngOnInit(): void {
    this.store.dispatch(cartActions.load());
  }
}
