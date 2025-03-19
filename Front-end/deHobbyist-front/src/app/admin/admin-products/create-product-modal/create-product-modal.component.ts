import { Component } from '@angular/core';
import {Product} from '../../../api.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-product-modal',
  imports: [],
  templateUrl: './create-product-modal.component.html',
  styleUrl: './create-product-modal.component.scss'
})
export class CreateProductModalComponent {
  product: Product = { id: 0, name: '', description: '', price: 0 };

  constructor(public activeModal: NgbActiveModal) {}

  saveProduct(): void {
    this.activeModal.close(this.product);
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
