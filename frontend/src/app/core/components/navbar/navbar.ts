import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Button } from '../../../shared/components/button/button';
import { authActions } from '../../../shared/store/auth-actions';
import { LucideAngularModule } from 'lucide-angular';
import { cartFeature } from '../../../pages/cart/store/cart-feature';

@Component({
  selector: 'app-navbar',
  imports: [Button, RouterLink, LucideAngularModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly store = inject(Store);
  protected readonly cartItemCount = toSignal(this.store.select(cartFeature.selectCartCount), {
    initialValue: 0,
  });

  protected logout() {
    this.store.dispatch(authActions.logout());
  }
}
