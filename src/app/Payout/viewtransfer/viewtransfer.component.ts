import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddwithdrawalComponent } from '../../Main Master/WIthdrawal/addwithdrawal/addwithdrawal.component';
import { FarginServiceService } from '../../service/fargin-service.service';
import { AddtransferComponent } from '../addtransfer/addtransfer.component';

@Component({
  selector: 'app-viewtransfer',
  templateUrl: './viewtransfer.component.html',
  styleUrl: './viewtransfer.component.css'
})
export class ViewtransferComponent {
  dataSource!: MatTableDataSource<any>;
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
    'modifiedBy',
    'modifiedDatetime',


  ];
  viewall: any;
 
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
  //     console.log(this.viewall);
  //   });
  // }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  add() {
    this.dialog.open(AddtransferComponent, {
      width: '80vw',// Use percentage to make it responsive
      maxWidth: '500px',
      // Ensure it doesn't get too wide on large screens
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }

}
