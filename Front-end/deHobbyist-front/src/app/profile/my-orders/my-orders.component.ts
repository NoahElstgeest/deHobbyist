import { Component } from '@angular/core';
import {ApiService} from '../../api.service';
import {Order} from '../../models/order';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule, RouterLink],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent {
  orders: Order[] = [];
  expanded = new Set<number>();   // UI-only state
  loading = true;
  error: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getMe().subscribe({
      next: me => {
        this.api.getUserOrders(me.id).subscribe({
          next: orders => {
            this.orders = orders.sort((a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            this.loading = false;
            },
          error: err => { this.error = err.error?.message || 'Failed to load orders.'; this.loading = false; }
        });
      },
      error: err => { this.error = err.error?.message || 'Failed to load user.'; this.loading = false; }
    });
  }

  toggle(id: number) {
    if (this.expanded.has(id)) this.expanded.delete(id);
    else this.expanded.add(id);
  }

  isExpanded(id: number) { return this.expanded.has(id); }
}
