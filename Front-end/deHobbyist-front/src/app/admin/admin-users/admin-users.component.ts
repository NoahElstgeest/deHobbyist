import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiService, User} from '../../api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditUserModalComponent} from './edit-user-modal/edit-user-modal.component';

@Component({
  selector: 'app-admin-users',
  imports: [CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => this.errorMessage = 'Error fetching users'
    });
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.apiService.deleteUser(userId).subscribe({
        next: () => this.users = this.users.filter(user => user.id !== userId),
        error: () => this.errorMessage = 'Error deleting user'
      });
    }
  }

  openEditModal(user: User): void {
    const modalRef = this.modalService.open(EditUserModalComponent, { centered: true });
    modalRef.componentInstance.user = { ...user };

    modalRef.result.then((updatedUser) => {
      if (updatedUser) {
        this.apiService.updateUser(updatedUser.id, updatedUser).subscribe({
          next: () => this.loadUsers(),
          error: () => this.errorMessage = 'Error updating user'
        });
      }
    }).catch(() => {});
  }
}

