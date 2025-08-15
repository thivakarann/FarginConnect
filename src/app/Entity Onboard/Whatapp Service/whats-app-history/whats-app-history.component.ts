import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { WhatsappMessDescriptionComponent } from '../whatsapp-mess-description/whatsapp-mess-description.component';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';

@Component({
  selector: 'app-whats-app-history',
  templateUrl: './whats-app-history.component.html',
  styleUrl: './whats-app-history.component.css'
})
export class WhatsAppHistoryComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'accountId',
    'entityName',
    'mobileNumber',
    'Vendor',
    'templateType',
    'Lan',
    'Title',
    'TempDescription',
    'Charges',
    'smsAmount',
    'responseStatus',
    'date',
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  FromDateRange!: string;
  currentPage!: number;
  ToDateRange!: string;
  Daterange!: string;
  Viewall: any;
  content: any;
  filteredData: any;
  getallData: any;
  term: any;
  responseDataListnew: any = [];
  response: any = [];
  date1: any;
  date2: any;
  transaction: any;
  message: any;
  showData: boolean = false;
  WhatsappResponseexport: any;
  valueentitysmsexport: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId');
  actions: any;
  errorMessage: any;
  pageIndex: number = 0;
  pageSize = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  pageIndex1: number = 0;
  pageSize1 = 5;
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
  pageIndex2: number = 0;
  pageSize2 = 5;
  totalpage2: any;
  totalPages2: any;
  currentpage2: any;
  filter: boolean = false;
  filter1: boolean = false;
  filters: boolean = false;
  smsResponseexport: any;
  currentfilval: any;
  currentfilvalShow: boolean = false;
  searchPerformed: boolean = false;
  limit: number = 30;
  Visible: boolean = false;
  maxDate: any;
  filterAction: any = 0;


  constructor(
    private service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    const today = new Date();
    this.maxDate = moment(today).format('yyyy-MM-DD').toString()

    this.Getall();
  };

  Getall() {
    const formData = new FormData();
    formData.append('content', '');
    formData.append('size', '5');
    formData.append('pageNumber', '0');

    this.service.WhatsAPPHistorys(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.Viewall = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.Viewall);
        this.currentfilvalShow = false;
      } else if (res.flag == 2) {
        this.Viewall = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.Viewall);
        this.currentfilvalShow = false;
      }
    });
  };

  Search(filterValue: string) {
    if (filterValue) {
      const formData = new FormData();
      formData.append('content', filterValue);
      formData.append('size', '5');
      formData.append('pageNumber', '0');

      this.service.WhatsAPPHistorys(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.Viewall = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.Viewall);
          this.currentfilvalShow = true;
        }
        else if (res.flag == 2) {
          this.Viewall = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.Viewall);
          this.currentfilvalShow = true;
        }
      })
    }
    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
  };

  checkDate() {
    this.ToDateRange = '';
  };

  resetFilter() {
    this.filterAction = 0;
    this.FromDateRange = '';
    this.ToDateRange = '';
    this.Daterange = '';
    this.currentfilval = '';
    this.Getall();
  };

  filterdate() {
    this.service.WhatsAPPHistorysFilters(this.FromDateRange, this.ToDateRange, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.Viewall = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.Viewall);
        this.filterAction = 1

      } else if (res.flag == 2) {
        this.Viewall = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.Viewall);
      }
    })
  }

  description(id: any) {
    this.dialog.open(WhatsappMessDescriptionComponent, {
      data: { value: id },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true
    })
  }

  getData(event: any) {
    if (this.filterAction == 1) {
      this.service.WhatsAPPHistorysFilters(this.FromDateRange, this.ToDateRange, event.pageSize, event.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.Viewall = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.Viewall);
        } else if (res.flag == 2) {
          this.Viewall = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.Viewall);
        }
      })
    }
    else if (this.currentfilvalShow) {
      const formData = new FormData();
      formData.append('content', this.currentfilval);
      formData.append('size', event.pageSize);
      formData.append('pageNumber', event.pageIndex);

      this.service.WhatsAPPHistorys(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.Viewall = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.Viewall);
        }
        else if (res.flag == 2) {
          this.Viewall = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.Viewall);
        }
      })
    }
    else {
      const formData = new FormData();
      formData.append('content', '');
      formData.append('size', event.pageSize);
      formData.append('pageNumber', event.pageIndex);
      this.service.WhatsAPPHistorys(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.Viewall = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.Viewall);

        }
        else if (res.flag == 2) {
          this.Viewall = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.Viewall);
        }
      });
    }
  };
}
