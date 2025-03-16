import { Component } from '@angular/core';
import {ShoppingCartComponent} from '../shopping-cart/shopping-cart.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [ShoppingCartComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
