import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FarginServiceService } from '../service/fargin-service.service';

@Component({
  selector: 'app-dues',
  templateUrl: './dues.component.html',
  styleUrl: './dues.component.css'
})
export class DuesComponent {
  dataSource: any;
  displayedColumns: string[] = ["regionId","onboard","amount","paynow"]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  regionValue: any;
  constructor(private router: Router, private service: FarginServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    // this.service.regionview().subscribe((res: any) => {
    //   this.regionValue = res.response;
    //   
    //   this.dataSource = new MatTableDataSource(this.regionValue?.reverse())
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  reload(){
    window.location.reload()
  }
}
