import {Component, Input} from '@angular/core';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-details-modal',
  imports: [NgbModule],
  templateUrl: './product-details-modal.component.html',
  styleUrl: './product-details-modal.component.scss'
})
export class ProductDetailsModalComponent {
  @Input() product: any;

  constructor(
    public activeModal: NgbActiveModal
  ) {}
}
