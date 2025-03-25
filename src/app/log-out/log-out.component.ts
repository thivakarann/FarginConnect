import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.css'
})
export class LogOutComponent {
  constructor(private dialog:MatDialog){
 
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
  logout(){
    sessionStorage.clear();
    // sessionStorage.removeItem('token');
    location.href = '/login-page';
  }
  close(){
    this.dialog.closeAll()
  }
}
