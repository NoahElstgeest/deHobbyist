import {Component, OnInit} from '@angular/core';
import {CartService} from '../cart.service';
import {HttpClient} from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import {Product} from '../models/product';
import {CommonModule} from '@angular/common';
import {ApiService} from '../api.service';
import {FormsModule} from '@angular/forms';

type Line = { product: Product; qty: number };

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  lines: Line[] = [];
  placingOrder = false;
  success = false;
  error: string | null = null;
  shippingAddress = '';
  billingAddress = '';

  constructor(private cart: CartService, private http: HttpClient, private router: Router, private api: ApiService) {
  }

  ngOnInit(): void {
    const state = (this.cart as any)['_state$'].value;
    this.lines = state.items.map((i: { product: Product; qty: number }) => ({
      product: i.product,
      qty: i.qty
    }));

    const uid = Number(localStorage.getItem('userId'));
    if (uid) {
      this.api.getUserById(uid).subscribe({
        next: (u) => {
          this.shippingAddress = (u.shippingAddress ?? '').trim();
          this.billingAddress = (u.billingAddress ?? '').trim();
        },
        error: () => console.warn('Could not load user profile')
      });
    }
  }


  get total(): number {
    return this.lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  }

  placeOrder(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login'], {queryParams: {returnUrl: '/checkout'}});
      return;
    }

    this.placingOrder = true;
    this.error = null;

    const items = this.lines.map(l => ({productId: l.product.id, quantity: l.qty}));

    this.api.placeOrder(items, {
      shippingAddress: this.shippingAddress.trim(),
      billingAddress: this.billingAddress.trim()
    }).subscribe({
      next: () => {
        this.success = true;
        this.cart.clear();
        setTimeout(() => this.router.navigate(['/profile']), 1200);
      },
      error: err => {
        this.error = err.error?.message || 'Failed to place order.';
        this.placingOrder = false;
      }
    });
  }
}
