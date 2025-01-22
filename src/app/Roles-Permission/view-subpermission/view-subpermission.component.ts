import { Component, Inject, OnInit, } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-subpermission',
  templateUrl: './view-subpermission.component.html',
  styleUrl: './view-subpermission.component.css'
})
export class ViewSubpermissionComponent implements OnInit {
  streetValue: any;
  subpermissionValue: any;
  currentPage: number = 1; // The current page number
  searchText: any;
  constructor(private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.subpermissionValue = this.data.value
  }

  back() {
    this.dialog.closeAll()
  }
  transform(value: any[], searchText: string): any[] {
    if (!value || !searchText) {
      return value;
    }
    return value.filter(item =>
      item.subpermissionValue.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  onSearchTextChange(): void {
    // Reset to the first page whenever the search text changes
    this.currentPage = 1;
  }
}
