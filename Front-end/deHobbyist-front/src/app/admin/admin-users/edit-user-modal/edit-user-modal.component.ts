import {Component, Input} from '@angular/core';
import {User} from '../../../api.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-user-modal',
  imports: [FormsModule],
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.scss'
})
export class EditUserModalComponent {
  @Input() user!: User;

  constructor(public activeModal: NgbActiveModal) {}

  saveChanges(): void {
    this.activeModal.close(this.user);
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
