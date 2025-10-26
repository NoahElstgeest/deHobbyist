import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {map, Observable} from 'rxjs';
import {CartService} from '../cart.service';
import {Router, RouterLink} from '@angular/router';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  cartItems$!: Observable<Array<{ id: number; name: string; price: number; quantity: number }>>;
  totalItems$!: Observable<number>;
  totalPrice$!: Observable<number>;

  constructor(private cart: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems$ = this.cart.items$.pipe(
      map(items => items.map(it => ({
        id: it.product.id,
        name: it.product.name,
        price: it.product.price,
        quantity: it.qty
      })))
    );
    this.totalItems$ = this.cart.count$;
    this.totalPrice$ = this.cart.total$;
  }

  inc(id: number)    { this.cart.setQty(id, this.safeQty(id) + 1); }
  dec(id: number)    { this.cart.setQty(id, this.safeQty(id) - 1); }
  remove(id: number) { this.cart.remove(id); }

  private safeQty(id: number): number {
    let q = 0;
    this.cart['_state$'].value.items.forEach(i => { if (i.product.id === id) q = i.qty; });
    return q;
  }
}
