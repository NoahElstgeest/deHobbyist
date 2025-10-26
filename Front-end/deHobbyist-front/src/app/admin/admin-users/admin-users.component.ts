import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiService} from '../../api.service';
import {NgbModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {EditUserModalComponent} from './edit-user-modal/edit-user-modal.component';
import {User} from '../../models/user';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin-users',
  imports: [CommonModule, NgbModalModule, RouterLink],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  loading = false;
  errorMessage = '';

  constructor(private api: ApiService, private modal: NgbModal) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.errorMessage = '';
    this.api.getUsers().subscribe({
      next: data => { this.users = data; this.loading = false; },
      error: () => { this.errorMessage = 'Error fetching users'; this.loading = false; }
    });
  }

  trackById = (_: number, u: User) => u.id;

  deleteUser(userId: number): void {
    if (!confirm('Are you sure you want to delete this user?')) return;
    this.api.deleteUser(userId).subscribe({
      next: () => (this.users = this.users.filter(u => u.id !== userId)),
      error: () => (this.errorMessage = 'Error deleting user')
    });
  }

  openEditModal(user: User): void {
    const modalRef = this.modal.open(EditUserModalComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.user = { ...user };

    modalRef.closed.subscribe((updatedUser: Partial<User> & { id: number }) => {
      this.api.updateUser(updatedUser.id, updatedUser).subscribe({
        next: () => this.loadUsers(),
        error: () => (this.errorMessage = 'Error updating user')
      });
    });
  }
}

