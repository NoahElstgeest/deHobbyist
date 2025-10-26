import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductsComponent} from './products/products.component';
import {authGuard} from './auth.guard';
import {AdminComponent} from './admin/admin.component';
import {AdminOrdersComponent} from './admin/admin-orders/admin-orders.component';
import {AdminProductsComponent} from './admin/admin-products/admin-products.component';
import {AdminUsersComponent} from './admin/admin-users/admin-users.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {MyOrdersComponent} from './profile/my-orders/my-orders.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent
  },
  {
    path: 'products',
    title: 'Producten',
    component: ProductsComponent
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent
  },
  { path: 'register',
    title: 'Registreren',
    component: RegisterComponent
  },
  {
    path: 'admin',
    title: 'Admin Portaal',
    component: AdminComponent,
    canActivate: [authGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'admin/users',
    title: 'Admin Portaal',
    component: AdminUsersComponent,
    canActivate: [authGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'admin/products',
    title: 'Admin Portaal',
    component: AdminProductsComponent,
    canActivate: [authGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'admin/orders',
    title: 'Admin Portaal',
    component: AdminOrdersComponent,
    canActivate: [authGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'profile',
    title: 'Profiel',
    component: ProfileComponent,
    canActivate: [authGuard],
    data: { roles: ['CUSTOMER', 'ADMIN'] }
  },
  {
    path: 'profile/orders',
    title: 'Mijn Orders',
    component: MyOrdersComponent,
    canActivate: [authGuard],
    data: { roles: ['CUSTOMER', 'ADMIN'] }
  },
  {
    path: 'checkout',
    title: 'Checkout',
    component: CheckoutComponent,
    canActivate: [authGuard],
    data: { roles: ['CUSTOMER', 'ADMIN'] }
  }
];
