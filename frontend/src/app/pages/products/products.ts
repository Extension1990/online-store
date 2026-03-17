import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { cartActions } from '../cart/store/cart-actions';
import { productActions } from './store/product-actions';
import { productFeature } from './store/product-feature';
import { Product } from './types/product-type';
import { Store } from '@ngrx/store';
import { ProductCard } from '../../core/components/product-card/product-card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [ProductCard, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  private readonly store = inject(Store);
  protected readonly products = toSignal(this.store.select(productFeature.selectFilteredProducts));
  protected readonly loading = toSignal(this.store.select(productFeature.selectLoading));

  protected searchQuery = signal('');

  protected onSearch(query: string): void {
    this.store.dispatch(productActions.search({ searchQuery: query }));
  }

  ngOnInit(): void {
    this.store.dispatch(productActions.load());
  }

  protected onAddToCart(product: Product): void {
    this.store.dispatch(cartActions.addToCart({ product }));
  }
}
