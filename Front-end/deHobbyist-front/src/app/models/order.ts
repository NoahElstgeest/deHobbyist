import {Product} from './product';

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  id: number;
  username: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  orderItems: OrderItem[];
  shippingAddress: string;
  billingAddress: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}
