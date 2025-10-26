import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiService} from '../api.service';
import {RouterLink} from '@angular/router';
import {Product} from '../models/product';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  featuredProducts: Product[] = [];

  constructor(private apiService: ApiService, private cart: CartService){}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts(): void {
    this.apiService.getLatestProducts().subscribe({
      next: (data: Product[]) => {
        this.featuredProducts = data;
      },
      error: (err) => {
        console.error('Error fetching featured products:', err);
      }
    });
  }

  addToCart(product: Product) {
    this.cart.add(product, 1);
  }
}
