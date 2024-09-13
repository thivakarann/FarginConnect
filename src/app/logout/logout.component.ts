import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private dialog: MatDialog) {

  }

  logout() {
    localStorage.removeItem('token');
    location.href = '/login-page';
  }

}
