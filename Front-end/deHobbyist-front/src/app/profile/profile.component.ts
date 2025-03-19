import {Component, OnInit} from '@angular/core';
import {ApiService, Order} from '../api.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  orders: Order[] = [];
  errorMessage: string = '';
  username: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'User';
    this.loadOrders();
  }

  loadOrders(): void {
    this.apiService.getUserOrders().subscribe({
      next: (data) => this.orders = data,
      error: () => this.errorMessage = 'Error fetching orders'
    });
  }
}
