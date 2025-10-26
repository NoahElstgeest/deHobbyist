import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {Product} from '../../../models/product';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-edit-product-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-product-modal.component.html',
  styleUrl: './edit-product-modal.component.scss'
})
export class EditProductModalComponent {
  @Input() product!: Product;

  get valid(): boolean {
    return !!this.product?.name?.trim() && this.product.price >= 0;
  }

  constructor(public activeModal: NgbActiveModal) {}

  saveChanges(): void {
    if (!this.valid) return;
    this.activeModal.close(this.product);
  }
  cancel(): void {
    this.activeModal.dismiss();
  }
}
