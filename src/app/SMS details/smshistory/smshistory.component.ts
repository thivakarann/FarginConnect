import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { SmscontentViewComponent } from '../smscontent-view/smscontent-view.component';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';
import { Payload } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-smshistory',
  templateUrl: './smshistory.component.html',
  styleUrl: './smshistory.component.css'
})
export class SMSHistoryComponent {

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'accountId',
    'entityname',
    'mobile',
    'templateType',
    'Lan',
    'smsType',
    'smsTempDescription',
    'responseStatus',
    'smscharge',
    'perSmsAmount',
    'date',
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  FromDateRange: string = '';
  currentPage!: number;
  ToDateRange: string = '';
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
  showcategoryData: boolean = false;
  smsResponse: any;
  getdashboard: any[] = [];
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  actions: any;
  errorMessage: any;
  valuesmshistoryexport: any;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  limit: number = 30;
  pageIndex: number = 0;
  pageSize = 5;
  smsResponseexport: any;
  Visible: boolean = false;
  pageIndex1: number = 0;
  pageSize1 = 5;
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
  transactionexport: any;
  pageIndex2: number = 0;
  pageSize2 = 5;
  totalpage2: any;
  totalPages2: any;
  currentpage2: any;
  filter: boolean = false;
  filter1: boolean = false;
  filters: boolean = false;
  currentfilVal: any = "";
  maxDate: any;
  currentfilvalShow: boolean = false;
  transactionValue: any;
  searchPerformed: boolean = false;
  filterAction: any = 0;
  Roledetails: any;

  constructor(
    private service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private cryptoService: EncyDecySericeService,
    private router: Router) { }

  ngOnInit(): void {

    const today = new Date();
    this.maxDate = moment(today).format('yyyy-MM-DD').toString()
    this.Role();
    this.Getall();
  }

  Role() {
    const payload = {
      roleId: this.roleId,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.service.rolegetById(datamodal).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.Roledetails = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.getdashboard = this.Roledetails.SubPermissionsAccess;

          if (this.roleId == 1) {
            this.valuesmshistoryexport = 'SMS History-Export';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissionName;
              if (this.actions == 'SMS History-Export') {
                this.valuesmshistoryexport = 'SMS History-Export';
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });
  }

  Getall() {
    this.service.SmsHistoryGetAll(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.smsResponse = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.smsResponse);
        this.currentfilvalShow = false;

      } else if (res.flag == 2) {
        this.smsResponse = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.smsResponse);
        this.currentfilvalShow = false;
      }
    });
    this.FromDateRange = '';
    this.ToDateRange = '';
    this.filterAction = 0
  };

  checkDate() {
    this.ToDateRange = '';
  };

  View(id: any) {
    this.router.navigate([`dashboard/smshistory-view/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  filterdate() {
    this.service.SMSHistoryFilter(this.FromDateRange, this.ToDateRange, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.filterAction = 1

      } else if (res.flag == 2) {
        this.transaction = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
      }
    })
  }

  smshistory(filterValue: string) {
    if (filterValue) {
      this.service.Smshistorysearch(filterValue, this.pageSize, this.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.smsResponse = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.smsResponse);
            this.currentfilvalShow = true;

          } else if (res.flag == 2) {
            this.smsResponse = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.smsResponse);
            this.currentfilvalShow = true;

          }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        }
      });
    }
    else if (filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
  }


  getData(event: any) {
    if (this.filterAction == 1) {
      this.service.SMSHistoryFilter(this.FromDateRange, this.ToDateRange, event.pageSize, event.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.transaction = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.transaction);
        } else if (res.flag == 2) {
          this.transaction = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.transaction);
        }
      })
    }
    else if (this.currentfilvalShow) {
      this.service.Smshistorysearch(this.currentfilVal, event.pageSize, event.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.smsResponse = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.smsResponse);


          } else if (res.flag == 2) {
            this.smsResponse = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.smsResponse);


          }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        }
      });
    }
    else {
      this.service.SmsHistoryGetAll(event.pageSize, event.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.smsResponse = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.smsResponse);


        } else if (res.flag == 2) {
          this.smsResponse = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.smsResponse);


        }
      })
    }
  }

  description(id: any) {
    this.dialog.open(SmscontentViewComponent, {
      data: { value: id },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true
    })
  }
}
