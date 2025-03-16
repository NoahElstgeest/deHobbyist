import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products = [
    { id: 1, name: 'Brei wol', price: 29.99, image: 'https://media.s-bol.com/B61ZL79VyylQ/550x407.jpg' },
    { id: 2, name: 'Product 2', price: 39.99, image: 'assets/images/product2.jpg' },
  ];

  constructor(

  ) {}

  viewProduct(product: any) {
    // Navigate to product detail page (implement routing)
  }

  addToCart(product: any) {
    // Add product to cart service
  }
}
