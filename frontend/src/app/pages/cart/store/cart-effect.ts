import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MyStorage } from '../../../shared/services/storage';
import { cartActions } from './cart-actions';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { cartFeature } from './cart-feature';
import { authFeatures } from '../../../shared/store/auth-feature';
import { CartApi } from '../services/cart-api';
import { NgToastService } from 'ng-angular-popup';

const CART_STORAGE_KEY = 'ngrxstore_cart';
export const loadCartEffect = createEffect(
  (actions$ = inject(Actions), storage = inject(MyStorage)) => {
    return actions$.pipe(
      ofType(cartActions.load),
      map(() => {
        const cartData = storage.getItem(CART_STORAGE_KEY);
        const items = cartData ? JSON.parse(cartData) : [];
        return cartActions.loadSuccess({ items });
      })
    );
  },
  {
    functional: true,
  }
);

export const addToCartEffect = createEffect(
  (actions$ = inject(Actions), toast = inject(NgToastService)) => {
    return actions$.pipe(
      ofType(cartActions.addToCart),
      map(({ product }) => {
        toast.success(`${product.title || 'Product'} added to cart`, 'SUCCESS');
        return cartActions.addToCartSuccess({ product });
      })
    );
  },
  {
    functional: true,
  }
);

export const persistCartEffect = createEffect(
  (actions$ = inject(Actions), storage = inject(MyStorage), store = inject(Store)) => {
    return actions$.pipe(
      ofType(
        cartActions.addToCartSuccess,
        cartActions.removeFromCart,
        cartActions.updateQuantity,
        cartActions.clearCart
      ),
      withLatestFrom(store.select(cartFeature.selectItems)),
      tap(([, items]) => {
        storage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

export const loadCartByUserEffect = createEffect(
  (actions$ = inject(Actions), cartApi = inject(CartApi), store = inject(Store)) => {
    return actions$.pipe(
      ofType(cartActions.load),
      withLatestFrom(store.select(authFeatures.selectUserId)),
      switchMap(([_, userId]) => {
        if (!userId) return of(cartActions.loadFailure({ error: 'No user ID' }));

        return cartApi.getCartByUserId(userId).pipe(
          map(items => cartActions.loadSuccess({ items })),
          catchError(error => of(cartActions.loadFailure({ error: error.message })))
        );
      })
    );
  },
  { functional: true }
);