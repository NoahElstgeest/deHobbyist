import {Component, Input} from '@angular/core';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../models/product';
import {CartService} from '../../cart.service';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details-modal',
  imports: [NgbModule, CommonModule, FormsModule],
  templateUrl: './product-details-modal.component.html',
  styleUrl: './product-details-modal.component.scss'
})
export class ProductDetailsModalComponent {
  @Input() product!: Product;
  qty = 1;

  constructor(public activeModal: NgbActiveModal, private cart: CartService) {}

  addToCartAndClose() {
    this.cart.add(this.product, Math.max(1, this.qty));
    this.activeModal.close();
  }
}
