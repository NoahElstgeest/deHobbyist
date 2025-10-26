export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  shippingAddress?: string;
  billingAddress?: string;
}
