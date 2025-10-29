import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { WhatsappMessDescriptionComponent } from '../whatsapp-mess-description/whatsapp-mess-description.component';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import FileSaver from 'file-saver';
import { WhatappBulkUploadComponent } from '../whatapp-bulk-upload/whatapp-bulk-upload.component';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

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
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
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
  searchAction: any = 0;;
  valueDownload: any;
  valueUpload: any;


  constructor(
    private service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private cryptoService: EncyDecySericeService,

  ) { }

  ngOnInit(): void {

    const today = new Date();
    this.maxDate = moment(today).format('yyyy-MM-DD').toString();

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valueDownload = 'Download WhatsApp Bulk Upload Template';
            this.valueUpload = 'Upload WhatsApp File'

          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Download WhatsApp Bulk Upload Template') {
                this.valueDownload = 'Download WhatsApp Bulk Upload Template'
              }
              if (this.actions == 'Upload WhatsApp File') {
                this.valueUpload = 'Upload WhatsApp File'
              }

            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });

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
    this.searchAction = 0;
    this.filterAction = 0;
  };

  Search(filterValue: string) {
    this.filterAction = 0;
    this.FromDateRange = '';
    this.ToDateRange = '';
    this.Daterange = '';
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
          this.searchAction = 1;
          this.filterAction = 0;
        }
        else if (res.flag == 2) {
          this.Viewall = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.Viewall);
          this.currentfilvalShow = true;
          this.searchAction = 1;
          this.filterAction = 0;
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


  resetDateFilter() {
    this.filterAction = 0;
    this.FromDateRange = '';
    this.ToDateRange = '';
    this.Daterange = '';
    this.Getall();
  }

  resetSearchFilter() {
    this.searchAction = 0;
    this.currentfilval = '';
    this.Getall();
  };

  filterdate() {
    this.searchAction = 0;
    this.currentfilval = '';
    this.service.WhatsAPPHistorysFilters(this.FromDateRange, this.ToDateRange, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.Viewall = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.Viewall);
        this.searchAction = 0;
        this.filterAction = 1;
      } else if (res.flag == 2) {
        this.Viewall = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.Viewall);
        this.searchAction = 0;
        this.filterAction = 1;
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
          this.searchAction = 0;
          this.filterAction = 1;
        } else if (res.flag == 2) {
          this.Viewall = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.Viewall);
          this.searchAction = 0;
          this.filterAction = 1;
        }
      })
    }
    else if (this.searchAction) {
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
          this.searchAction = 1;
          this.filterAction = 0;
        }
        else if (res.flag == 2) {
          this.Viewall = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.Viewall);
          this.searchAction = 1;
          this.filterAction = 0;
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
          this.searchAction = 0;
          this.filterAction = 0;
          this.currentfilvalShow = false;
        }
        else if (res.flag == 2) {
          this.Viewall = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.Viewall);
          this.searchAction = 0;
          this.filterAction = 0;
          this.currentfilvalShow = false;
        }
      });
    }
  };


  excelbulk() {
    const header = ['mobileNumber', 'date', 'reason'];
    const data = this.responseDataListnew;
    // Prepare CSV content
    const csvContent = [];
    // Add header to CSV
    csvContent.push(header.map((item) => `"${item}"`).join(','));
    data.forEach((d: any) => {
      // Prepare the row data
      const rowData = [`"${d.mobileNumber}"` || '', d.date || '', `"${d.reason}"` || '',].map((item) => `"${item.replace(/"/g, '""')}"`);
      csvContent.push(rowData.join(','));
    });
    // Create a Blob and save as CSV
    const blob = new Blob([csvContent.join('\n')], { type: 'text/csv;charset=utf-8;', });
    FileSaver.saveAs(blob, 'WhatsApp.csv');
  }

  createWhatsApp() {
    const dialogRef = this.dialog.open(WhatappBulkUploadComponent, {
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      position: { right: '0px' }, width: '35%',
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

}
