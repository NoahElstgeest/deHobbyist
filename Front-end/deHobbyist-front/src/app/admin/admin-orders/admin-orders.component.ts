import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiService, Order} from '../../api.service';

@Component({
  selector: 'app-admin-orders',
  imports: [CommonModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.scss'
})
export class AdminOrdersComponent {
  orders: Order[] = [];
  errorMessage: string = '';
  orderStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.apiService.getOrders().subscribe({
      next: (data) => this.orders = data,
      error: () => this.errorMessage = 'Error fetching orders'
    });
  }

  updateOrderStatus(order: Order, newStatus: string): void {
    if (order.status !== newStatus) {
      order.status = newStatus;
      this.apiService.updateOrderStatus(order.id, newStatus).subscribe({
        next: () => console.log(`Order ${order.id} status updated to ${newStatus}`),
        error: () => this.errorMessage = 'Error updating order status'
      });
    }
  }
}
