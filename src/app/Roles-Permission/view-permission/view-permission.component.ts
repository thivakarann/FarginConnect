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
  currentPage: number = 1; // The current page number
  searchText: any;
  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.permissionvalue = this.data.value
    
    
  }

  back() {
    this.dialog.closeAll()
  }

  onSearchTextChange(): void {
    // Reset to the first page whenever the search text changes
    this.currentPage = 1;
  }

  transform(value: any[], searchText: string): any[] {
    if (!value || !searchText) {
      return value;
    }
    return value.filter(item =>
      item.permissionvalue.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
