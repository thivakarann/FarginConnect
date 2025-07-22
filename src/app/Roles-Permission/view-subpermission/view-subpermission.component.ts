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
  displayedColumns: any[] = ["sno", "permission", "sub"];
  searchPerformed: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.subpermissionValue = this.sortPermissions(this.data.value);
    this.dataSource = new MatTableDataSource(this.subpermissionValue);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  reload() {
    this.subpermissionValue = this.sortPermissions(this.data.value);
    this.dataSource = new MatTableDataSource(this.subpermissionValue);
    this.ngAfterViewInit();
  }

  private sortPermissions(data: any[]): any[] {
    return data.slice().sort((a, b) => {
      const aPermission = String(a?.permission?.permission || '').toLowerCase();
      const bPermission = String(b?.permission?.permission || '').toLowerCase();
      return aPermission.localeCompare(bPermission);
    });
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
