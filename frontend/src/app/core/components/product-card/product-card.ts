import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '../../../pages/products/types/product-type';
import { CurrencyPipe } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-product-card',
  imports: [Button, CurrencyPipe, LucideAngularModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
  host: {
    class: 'block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly addToCart = output<Product>();
}
