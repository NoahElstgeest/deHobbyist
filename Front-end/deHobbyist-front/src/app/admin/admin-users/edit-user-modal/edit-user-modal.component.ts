import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {User} from '../../../models/user';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-edit-user-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.scss'
})
export class EditUserModalComponent {
  @Input() user!: User;

  constructor(public activeModal: NgbActiveModal) {}

  saveChanges(): void {
    const payload = {
      id: this.user.id,
      username: this.user.username,
      email: this.user.email,
      role: this.user.role
    };
    this.activeModal.close(payload);
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
