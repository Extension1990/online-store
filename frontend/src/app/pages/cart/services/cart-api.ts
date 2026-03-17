import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartItem } from '../types/cart-type';
import { API_URL } from '../../../app.config';

@Injectable({
  providedIn: 'root',
})
export class CartApi {
  private readonly http = inject(HttpClient);
    private readonly baseApiUrl = inject(API_URL);
  
  getCartByUserId(userId: number): Observable<CartItem[]> {
    return this.http.get<{ products: { productId: number; quantity: number }[] }>(
      `${this.baseApiUrl}/carts/${userId}`
    ).pipe(
      map(response => 
        response.products.map(p => ({ product: { id: p.productId } as any, quantity: p.quantity }))
      )
    );
  }
}
