import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../service/fargin-service.service';
import { Location } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-entity-auto-debit-by-id',
  templateUrl: './entity-auto-debit-by-id.component.html',
  styleUrl: './entity-auto-debit-by-id.component.css'
})
export class EntityAutoDebitByIdComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'merchantLogId',
    'accountId',
    'merchantLegalName',
    'categoryName',
    'planName',
    'rentalAmount',
    'rentalPeriod',
    'fromLedger',
    'toLedger',
    'reason',
    'createAt'
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  id: any;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  pageIndex: number = 0;
  pageSize = 5;
searchPerformed: boolean =false;

filter:boolean=false;
pageSize1= 5;
pageIndex1: number = 0;
currentfilval: any;
  overallcustomer: any;
  totalPages1: any;
  totalpage1: any;
  currentpage1: any;
  currentfilvalShow:boolean=false;
  
  constructor(
    public autodebitdetailsbyid: FarginServiceService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    public location: Location
  ) { }
  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.autodebitdetailsbyid.autodebitbymerchat(this.id, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if(res.flag==1)
      {
        this.viewall = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.viewall);
        this.currentfilvalShow = false;
      } else if (res.flag == 2) {
        this.viewall = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.viewall);
        this.currentfilvalShow = false;
      }

    });
  }

  reload() {
      this.autodebitdetailsbyid.autodebitbymerchat(this.id, this.pageSize, this.pageIndex).subscribe((res: any) => {
        if(res.flag==1)
        {
          this.viewall = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.viewall);
          this.currentfilvalShow = false;
        } else if (res.flag == 2) {
          this.viewall = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.viewall);
          this.currentfilvalShow = false;
        }

      });
  }





  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  close() {
    this.location.back()
  }
  
 

   customer(filterValue: string) {
  
    if (filterValue) {
    this.autodebitdetailsbyid.autodebitbymerchatsearch(this.id, filterValue,this.pageSize,this.pageIndex).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.overallcustomer = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.overallcustomer);
          this.currentfilvalShow = true;
        } else if (res.flag == 2) {
          this.overallcustomer = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.overallcustomer);
          this.currentfilvalShow = true;
        }
  
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      }
    });
  }
  else if (!filterValue) {
    this.toastr.error('Please enter a value to search');
    return;
  }
  }

  getData(event: any) {
    if (this.currentfilvalShow) {
      this.autodebitdetailsbyid.autodebitbymerchatsearch(this.id, this.currentfilval,event.pageSize,event.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.overallcustomer = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.overallcustomer); 
          } else if (res.flag == 2) {
            this.overallcustomer = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.overallcustomer); 
          }
    
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        }
      });
  } else {
    this.autodebitdetailsbyid.autodebitbymerchat(this.id, event.pageSize, event.pageIndex).subscribe((res: any) => {
      if(res.flag==1)
      {
        this.viewall = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.viewall); 
      } else if (res.flag == 2) {
        this.viewall = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.viewall); 
      }

    });
  }
}
}
