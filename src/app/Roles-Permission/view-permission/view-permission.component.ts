import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-permission',
  templateUrl: './view-permission.component.html',
  styleUrl: './view-permission.component.css'
})
export class ViewPermissionComponent {
  streetValue: any;
  permissionvalue: any;
  currentPage: any = 1; 
  searchText: any;
  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.permissionvalue = this.data.value
    
    
  }

  back() {
    this.dialog.closeAll()
  }
}
