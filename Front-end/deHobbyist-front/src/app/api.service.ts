import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './models/product';
import {User} from './models/user';
import {Order, OrderStatus} from './models/order';

export interface AuthResponse {
  token: string;
  role: string;
  id: number;
}

type OrderItemInput = { productId: number; quantity: number };
type OrderAddressOpts = { shippingAddress: string; billingAddress: string };

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, { username, password });
  }

  register(username: string, email: string, password: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/register`, { username, email, password });
  }

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/me`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${userId}`);
  }

  updateUser(userId: number, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${userId}`, userData);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getLatestProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products/latest`);
  }

  addProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products`, product);
  }

  updateProduct(productId: number, product: Partial<Product>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/products/${productId}`, product);
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/products/${productId}`);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders`);
  }

  getUserOrders(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders/user/${userId}`);
  }

  updateOrderStatus(orderId: number, status: OrderStatus): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/orders/${orderId}/status`, null, {
      params: { status }
    });
  }

  placeOrder(
    items: OrderItemInput[],
    opts?: OrderAddressOpts
  ): Observable<Order> {
    const body: any = {
      orderItems: items.map(i => ({
        product: { id: i.productId },
        quantity: i.quantity
      }))
    };

    if (opts) {
      body.shippingAddress = opts.shippingAddress;
      body.billingAddress  = opts.billingAddress;
    }

    return this.http.post<Order>(`${this.baseUrl}/orders`, body);
  }
}
