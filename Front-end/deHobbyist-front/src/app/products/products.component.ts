import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductDetailsModalComponent} from './product-details-modal/product-details-modal.component';

@Component({
  selector: 'app-products',
  imports: [CommonModule, NgbModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products = [
    { id: 1, name: 'Brei wol', price: 29.99, image: 'https://media.s-bol.com/B61ZL79VyylQ/550x407.jpg' },
    { id: 2, name: 'Product 2', price: 39.99, image: 'assets/images/product2.jpg' },
  ];

  constructor(
    private modalService: NgbModal
  ) {}

  viewDetails(product: any) {
    const modalRef = this.modalService.open(ProductDetailsModalComponent);
    modalRef.componentInstance.product = product;
  }

  addToCart(product: any) {
    // Add product to cart service
  }
}
