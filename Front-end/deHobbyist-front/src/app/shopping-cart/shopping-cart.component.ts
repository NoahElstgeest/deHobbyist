import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  cartItems: CartItem[] = [
    { name: 'Product 1', price: 19.99, quantity: 1 },
    { name: 'Product 2', price: 29.99, quantity: 2 }
  ];

  get totalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  get totalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
