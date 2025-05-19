import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-subpermission',
  templateUrl: './view-subpermission.component.html',
  styleUrl: './view-subpermission.component.css'
})
export class ViewSubpermissionComponent {
  streetValue: any;
  subpermissionValue: any;
  currentPage: number = 1; 
  searchText: any;

     dataSource: any;
       @ViewChild(MatPaginator) paginator!: MatPaginator;
       @ViewChild(MatSort) sort!: MatSort;
       displayedColumns: any[] = ["sno", "permission","sub"];
  searchPerformed: any;
  constructor(private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
       this.subpermissionValue = this.data.value
    this.dataSource = new MatTableDataSource(this.subpermissionValue)
     }

  ngOnInit(): void {
  
  }
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
 reload(){
    this.subpermissionValue = this.data.value
    this.dataSource = new MatTableDataSource(this.subpermissionValue)
      this.ngAfterViewInit()
  }
 applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
      item.subpermissionValue.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
