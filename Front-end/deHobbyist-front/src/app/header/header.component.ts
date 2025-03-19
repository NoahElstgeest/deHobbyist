import { Component } from '@angular/core';
import {ShoppingCartComponent} from '../shopping-cart/shopping-cart.component';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [ShoppingCartComponent, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isAdmin(): boolean {
    return localStorage.getItem('role') === 'ADMIN';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    location.reload();
  }
}
