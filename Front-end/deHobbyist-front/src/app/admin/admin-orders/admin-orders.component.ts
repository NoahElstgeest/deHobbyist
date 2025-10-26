import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiService} from '../../api.service';
import {Order, OrderStatus} from '../../models/order';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.scss'
})
export class AdminOrdersComponent implements OnInit{
  orders: Order[] = [];
  loading = false;
  errorMessage = '';

  statusOptions: { value: OrderStatus; label: string }[] = [
    { value: 'PENDING',    label: 'Pending' },
    { value: 'PROCESSING', label: 'Processing' },
    { value: 'SHIPPED',    label: 'Shipped' },
    { value: 'DELIVERED',  label: 'Delivered' },
    { value: 'CANCELLED',  label: 'Cancelled' }
  ];

  statusLabelMap: Record<string, string> = {
    PENDING: 'Pending',
    PROCESSING: 'Processing',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled'
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void { this.loadOrders(); }

  loadOrders(): void {
    this.loading = true;
    this.errorMessage = '';
    this.apiService.getOrders().subscribe({
      next: data => {
        // newest first
        this.orders = [...data].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.loading = false;
      },
      error: () => { this.errorMessage = 'Error fetching orders'; this.loading = false; }
    });
  }

  trackById = (_: number, o: Order) => o.id;

  updateOrderStatus(order: Order, newStatus: OrderStatus): void {
    if (order.status === newStatus) return;

    const prev = order.status;
    order.status = newStatus; // optimistic UI

    this.apiService.updateOrderStatus(order.id, newStatus).subscribe({
      next: () => {/* success toast could go here */},
      error: () => {
        order.status = prev; // revert on failure
        this.errorMessage = 'Error updating order status';
      }
    });
  }
}
