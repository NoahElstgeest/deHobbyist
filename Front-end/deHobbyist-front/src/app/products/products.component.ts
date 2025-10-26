import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductDetailsModalComponent} from './product-details-modal/product-details-modal.component';
import {ApiService} from '../api.service';
import {CartService} from '../cart.service';
import {Product} from '../models/product';

@Component({
  selector: 'app-products',
  imports: [CommonModule, NgbModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  products: Product[] = [];

  constructor(
    private modalService: NgbModal,
    private apiService: ApiService,
    private cart: CartService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  viewDetails(product: any) {
    const modalRef = this.modalService.open(ProductDetailsModalComponent);
    modalRef.componentInstance.product = product;
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (err) => {
        console.error("❌ Error fetching products:", err);
      }
    });
  }

  addToCart(p: Product) {
    this.cart.add(p, 1);
  }
}
