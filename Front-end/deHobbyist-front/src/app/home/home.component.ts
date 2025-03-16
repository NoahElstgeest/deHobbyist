import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  featuredProducts = [
    { name: 'Product 1', price: 19.99, image: 'assets/product1.jpg' },
    { name: 'Product 2', price: 29.99, image: 'assets/product2.jpg' },
    { name: 'Product 3', price: 39.99, image: 'assets/product3.jpg' }
  ];
}
