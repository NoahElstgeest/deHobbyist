import { Component } from '@angular/core';
import {ApiService} from '../api.service';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Wachtwoorden komen niet overeen.';
      this.successMessage = '';
      return;
    }

    if (!this.username || !this.email || !this.password) {
      this.errorMessage = 'Vul alle velden in.';
      this.successMessage = '';
      return;
    }

    this.apiService.register(this.username, this.email, this.password).subscribe({
      next: () => {
        this.successMessage = 'Registratie successvol! We leiden je nu om...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: () => this.errorMessage = 'Registratie gefaald. Probeer later opnieuw.'
    });
  }
}
