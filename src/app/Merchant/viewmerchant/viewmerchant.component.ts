import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-viewmerchant',
  templateUrl: './viewmerchant.component.html',
  styleUrl: './viewmerchant.component.css'
})
export class ViewmerchantComponent {
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
    'View',
 
    'createdBy',
    'createdDatetime',
    'modifiedBy',
    'modifiedDatetime',


  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
