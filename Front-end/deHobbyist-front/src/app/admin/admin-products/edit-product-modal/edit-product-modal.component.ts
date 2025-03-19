import {Component, Input} from '@angular/core';
import {Product} from '../../../api.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-product-modal',
  imports: [FormsModule],
  templateUrl: './edit-product-modal.component.html',
  styleUrl: './edit-product-modal.component.scss'
})
export class EditProductModalComponent {
  @Input() product!: Product;

  constructor(public activeModal: NgbActiveModal) {}

  saveChanges(): void {
    this.activeModal.close(this.product);
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
