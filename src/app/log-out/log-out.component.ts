import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.css'
})
export class LogOutComponent implements OnInit {
  
  constructor(private dialog:MatDialog){
 
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
  logout(){
    localStorage.clear();
    // localStorage.removeItem('token');
    location.href = 'admin/login';
  }
  close(){
    this.dialog.closeAll()
  }
}
