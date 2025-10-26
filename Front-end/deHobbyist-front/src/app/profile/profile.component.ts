import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {CommonModule} from '@angular/common';
import {User} from '../models/user';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  me: User | null = null;
  loading = true;
  saving = false;
  error: string | null = null;
  saveMessage: string | null = null;
  saveError: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getMe().subscribe({
      next: (data) => {
        this.me = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Kon profielinformatie niet ophalen.';
        this.loading = false;
      }
    });
  }

  saveAddresses(): void {
    if (!this.me) return;
    this.saving = true;
    this.saveMessage = null;
    this.saveError = null;

    this.api.updateUser(this.me.id, {
      shippingAddress: this.me.shippingAddress,
      billingAddress: this.me.billingAddress
    }).subscribe({
      next: () => {
        this.saveMessage = 'adres bijgewerkt.';
        this.saving = false;
      },
      error: () => {
        this.saveError = 'Opslaan mislukt. Probeer het later opnieuw.';
        this.saving = false;
      }
    });
  }
}
