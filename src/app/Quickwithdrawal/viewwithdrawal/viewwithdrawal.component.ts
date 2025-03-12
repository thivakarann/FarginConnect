import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { AddwithdrawalComponent } from '../addwithdrawal/addwithdrawal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-viewwithdrawal',
  templateUrl: './viewwithdrawal.component.html',
  styleUrl: './viewwithdrawal.component.css'
})
export class ViewwithdrawalComponent {
  dataSource:any;
  displayedColumns: string[] = [
    'merchantId',
    'entityName',
    'merchantLegalName',
    'businessCategoryModel',
    'referenceNo',
    'contactEmail',
    'contactMobile',
    'website',
    'createdBy',
    'createdDatetime',
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog:MatDialog
  ) { }

  // ngOnInit(): void {
  //   this.service.EntityViewall().subscribe((res: any) => {
  //     this.viewall = res.response;
  //     this.viewall.reverse();
  //     this.dataSource = new MatTableDataSource(this.viewall);
  //     this.dataSource.sort = this.sort;
  //     this.dataSource.paginator = this.paginator;
  //     
  //   });
  // }
  
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
  add() {
    this.dialog.open(AddwithdrawalComponent, {
      width: '80vw',// Use percentage to make it responsive
      maxWidth: '500px',
      // Ensure it doesn't get too wide on large screens
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }


}


