import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EncyDecySericeService } from '../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  constructor(
    private router: Router,
    private location: Location,
    private cryptoService: EncyDecySericeService
  ) {}

  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  emailaddress: any = this.cryptoService.decrypt(sessionStorage.getItem('Four') || '');
  mobilenumber: any = this.cryptoService.decrypt(sessionStorage.getItem('Six') || '');
  address: any = this.cryptoService.decrypt(sessionStorage.getItem('Five') || '');

  click() {
    this.location.back();
  }
}
