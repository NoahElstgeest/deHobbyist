import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import {Product} from './models/product';
import {CartState} from './models/cart';

const LS_KEY = 'cart_v1';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _state$ = new BehaviorSubject<CartState>(this.load());
  readonly state$ = this._state$.asObservable();

  readonly items$ = this.state$.pipe(map(s => s.items));
  readonly count$ = this.state$.pipe(map(s => s.items.reduce((n, it) => n + it.qty, 0)));
  readonly total$ = this.state$.pipe(map(s => s.items.reduce((sum, it) => sum + it.product.price * it.qty, 0)));

  add(product: Product, qty = 1) {
    const s = this.clone();
    const ix = s.items.findIndex(i => i.product.id === product.id);
    if (ix >= 0) s.items[ix].qty += qty;
    else s.items.push({ product, qty });
    this.commit(s);
  }

  setQty(productId: number, qty: number) {
    const s = this.clone();
    const ix = s.items.findIndex(i => i.product.id === productId);
    if (ix < 0) return;
    if (qty <= 0) s.items.splice(ix, 1);
    else s.items[ix].qty = qty;
    this.commit(s);
  }

  remove(productId: number) {
    const s = this.clone();
    const ix = s.items.findIndex(i => i.product.id === productId);
    if (ix >= 0) { s.items.splice(ix, 1); this.commit(s); }
  }

  clear() { this.commit({ items: [] }); }

  // helpers
  private commit(next: CartState) {
    this._state$.next(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
  }
  private clone(): CartState {
    return { items: this._state$.value.items.map(i => ({ product: i.product, qty: i.qty })) };
  }
  private load(): CartState {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '{"items":[]}'); }
    catch { return { items: [] }; }
  }
}
