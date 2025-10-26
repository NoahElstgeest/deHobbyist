import { Component } from '@angular/core';
import {ApiService} from '../../api.service';
import {NgbModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {EditProductModalComponent} from './edit-product-modal/edit-product-modal.component';
import {CreateProductModalComponent} from './create-product-modal/create-product-modal.component';
import {Product} from '../../models/product';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin-products',
  imports: [CommonModule, FormsModule, NgbModalModule, RouterLink],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss'
})
export class AdminProductsComponent {
  products: Product[] = [];
  loading = false;
  errorMessage = '';

  constructor(private api: ApiService, private modal: NgbModal) {}

  ngOnInit(): void { this.loadProducts(); }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';
    this.api.getProducts().subscribe({
      next: data => { this.products = data; this.loading = false; },
      error: () => { this.errorMessage = 'Error fetching products'; this.loading = false; }
    });
  }

  trackById = (_: number, p: Product) => p.id;

  openEditModal(product: Product): void {
    const modalRef = this.modal.open(EditProductModalComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.product = { ...product };

    modalRef.closed.subscribe((updated: Product) => {
      this.api.updateProduct(updated.id, updated).subscribe({
        next: () => this.loadProducts(),
        error: () => this.errorMessage = 'Error updating product'
      });
    });
  }

  openCreateModal(): void {
    const modalRef = this.modal.open(CreateProductModalComponent, { centered: true, size: 'md' });
    modalRef.closed.subscribe((created: Omit<Product, 'id'>) => {
      this.api.addProduct(created).subscribe({
        next: () => this.loadProducts(),
        error: () => this.errorMessage = 'Error creating product'
      });
    });
  }

  deleteProduct(productId: number): void {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.api.deleteProduct(productId).subscribe({
      next: () => this.products = this.products.filter(p => p.id !== productId),
      error: () => this.errorMessage = 'Error deleting product'
    });
  }
}
