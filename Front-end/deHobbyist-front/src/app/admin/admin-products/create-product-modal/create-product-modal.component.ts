import { Component } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {Product} from '../../../models/product';
import {CommonModule} from '@angular/common';

type NewProduct = Omit<Product, 'id'>;

@Component({
  selector: 'app-create-product-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-product-modal.component.html',
  styleUrl: './create-product-modal.component.scss'
})
export class CreateProductModalComponent {
  product: NewProduct = { name: '', description: '', price: 0, stock: 0, imageUrl: '' };
  saving = false;

  constructor(public activeModal: NgbActiveModal) {}

  get valid(): boolean {
    return !!this.product.name?.trim() && this.product.price >= 0;
  }

  saveProduct(): void {
    if (!this.valid) return;
    this.activeModal.close(this.product);
  }
  cancel(): void { this.activeModal.dismiss(); }
}
