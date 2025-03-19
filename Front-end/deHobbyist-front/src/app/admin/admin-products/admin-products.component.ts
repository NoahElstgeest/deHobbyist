import { Component } from '@angular/core';
import {ApiService, Product} from '../../api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {EditProductModalComponent} from './edit-product-modal/edit-product-modal.component';
import {CreateProductModalComponent} from './create-product-modal/create-product-modal.component';

@Component({
  selector: 'app-admin-products',
  imports: [CommonModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss'
})
export class AdminProductsComponent {
  products: Product[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: () => this.errorMessage = 'Error fetching products'
    });
  }

  openEditModal(product: Product): void {
    const modalRef = this.modalService.open(EditProductModalComponent, { centered: true });
    modalRef.componentInstance.product = { ...product };

    modalRef.result.then((updatedProduct) => {
      if (updatedProduct) {
        this.apiService.updateProduct(updatedProduct.id, updatedProduct).subscribe({
          next: () => this.loadProducts(),
          error: () => this.errorMessage = 'Error updating product'
        });
      }
    }).catch(() => {});
  }

  openCreateModal(): void {
    const modalRef = this.modalService.open(CreateProductModalComponent, { centered: true });

    modalRef.result.then((newProduct) => {
      if (newProduct) {
        this.apiService.addProduct(newProduct).subscribe({
          next: () => this.loadProducts(),
          error: () => this.errorMessage = 'Error creating product'
        });
      }
    }).catch(() => {});
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.apiService.deleteProduct(productId).subscribe({
        next: () => this.products = this.products.filter(product => product.id !== productId),
        error: () => this.errorMessage = 'Error deleting product'
      });
    }
  }
}
