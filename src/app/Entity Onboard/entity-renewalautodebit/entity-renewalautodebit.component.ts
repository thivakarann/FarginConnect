import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-entity-renewalautodebit',
  templateUrl: './entity-renewalautodebit.component.html',
  styleUrl: './entity-renewalautodebit.component.css',
})
export class EntityRenewalautodebitComponent {
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
    'createAt',
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
  searchPerformed: boolean = false;
  filter: boolean = false;
  pageSize1 = 5;
  pageIndex1: number = 0;
  currentfilval: any;
  overallcustomer: any;
  totalPages1: any;
  totalpage1: any;
  currentpage1: any;
  currentfilvalShow: boolean = false;

  constructor(
    public service: FarginServiceService,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    public location: Location
  ) { }
  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.Getall();
  }

  Getall() {
    this.service
      .renewalautodebitbyid(this.id, this.pageSize, this.pageIndex)
      .subscribe((res: any) => {
        if (res.flag == 1) {
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
    this.location.back();
  }

  customer(filterValue: string) {
    if (filterValue) {
      this.service
        .renewalautodebitsearchbyid(
          this.id,
          filterValue,
          this.pageSize,
          this.pageIndex
        )
        .subscribe({
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
          },
        });
    } else if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
  }

  getData(event: any) {
    if (this.currentfilvalShow) {
      this.service
        .renewalautodebitsearchbyid(
          this.id,
          this.currentfilval,
          event.pageSize,
          event.pageIndex
        )
        .subscribe({
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
          },
        });
    } else {
      this.service
        .renewalautodebitbyid(this.id, event.pageSize, event.pageIndex)
        .subscribe((res: any) => {
          if (res.flag == 1) {
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
