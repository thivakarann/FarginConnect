import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-viewworkflow',
  templateUrl: './viewworkflow.component.html',
  styleUrl: './viewworkflow.component.css'
})
export class ViewworkflowComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'merchantId',
    'entityName',
    'contactEmail',
    'accountId',
    'referenceNo',
    'merchantLegalName',
    'businessCategoryModel',
    'finalapproval',
    'pgonboard',
    'status',
    'View',
    'createdDatetime',
  
  ];
  viewall: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
  date1: any;
  date2: any;
  responseDataListnew: any = [];
  response: any = [];

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
  //   this.EntityViewall.EntityViewall().subscribe((res: any) => {
  //     this.viewall = res.response;
  //     this.viewall.reverse();
  //     this.dataSource = new MatTableDataSource(this.viewall);
  //     this.dataSource.sort = this.sort;
  //     this.dataSource.paginator = this.paginator;
  //     console.log(this.viewall);
  //   });
  // }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
