import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-refund-getall',
  templateUrl: './refund-getall.component.html',
  styleUrl: './refund-getall.component.css',
})
export class RefundGetallComponent {
  dataSource: any;
  displayedColumns: string[] = [
    'sno',
    'type',
    'entityname',
    'custname',
    'custmobile',
    'pgPaymentId',
    'reqid',
    'activityid',
    'paidAmount',
    'refund',
    'status',
    'refundDate',
  ];
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  merchantId: any = sessionStorage.getItem('merchantId');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  refund: any;
  merchantPayId: any;
  apikey: any;
  pgModelID: any;
  transactionId: any;
  orderReference: any;
  hashKey: any;
  entityName: any;
  contactEmail: any;
  contactMobile: any;
  billingAddress: any;
  zipcode: any;
  city: any;
  stateName: any;
  secretKey: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = sessionStorage.getItem('roleId');
  valuerenewexport: any;
  valuerenewview: any;
  valuerenewpay: any;
  valuerenewinvoice: any;
  roleName = sessionStorage.getItem('roleName');
  searchPerformed: boolean = false;
  date1: any;
  date2: any;
  date3: any;

  pageIndex1: number = 0;
  pageSize1 = 5;

  totalpage1: any;
  totalPages1: any;
  currentpage1: any;

  filter: boolean = false;
  currentfilval: any;
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  refundexport: any;
  valuerefundexport: any;
  errorMessage: any;
  FromDateRange: string = '';
  ToDateRange: string = '';

  pageIndex2: number = 0;
  pageSize2 = 5;

  totalpage2: any;
  totalPages2: any;
  currentpage2: any;

  filter1: boolean = false;
  filters: boolean = false;
  transaction: any;
  maxDate: any;
  currentfilvalShow: boolean = false;
  transactionValue: any;
  filterAction: any = 0;
  selectedTransactionType: string = 'Due Transaction';
  additionaldetails: any;
  additionalTransactionData: unknown[] | undefined;
  additionalsearchdetails: any;
  currentfilvals: any;
  FromDateRanges: string = '';
  ToDateRanges: string = '';
  filterActions: any = 0;
  datetransaction: any;

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.maxDate = moment(today).format('yyyy-MM-DD').toString();

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valuerefundexport = 'Online Refunds-Export';
          } else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Online Refunds-Export') {
                this.valuerefundexport = 'Online Refunds-Export';
              }
            }
          }
        } else {
          this.errorMessage = res.responseMessage;
        }
      },
    });
    this.GetAll();
  }
  GetAll() {
    this.service
    .RefundGetAll(this.pageSize, this.pageIndex)
    .subscribe((res: any) => {
      if (res.flag == 1) {
        this.refund = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.refund);
        this.currentfilvalShow = false;
      } else if (res.flag == 2) {
        this.refund = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.refund);
        this.currentfilvalShow = false;
      }
    });
  }

  getAdditional() {
    this.service
    .additionalRefundGetAll(this.pageSize, this.pageIndex)
    .subscribe((res: any) => {
      if (res.flag == 1) {
        this.additionaldetails = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.additionaldetails);
        this.currentfilvalShow = false;
      } else if (res.flag == 2) {
        this.additionaldetails = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.additionaldetails);
        this.currentfilvalShow = false;
      }
    });
  }
  checkDate() {
    this.ToDateRange = '';
    // this.FromDateRange =''
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  reload() {
    this.GetAll();
  }
  reloadadditional() {
    this.getAdditional();
  }

  refundsearch(filterValue: string) {
    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }

    this.service
    .RefundGetAllSearch(filterValue, this.pageSize, this.pageIndex, 1)
    .subscribe({
      next: (res: any) => {
        if (res.response) {
          this.refund = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.refund);
          this.currentfilvalShow = true;
        } else if (res.flag == 2) {
          this.refund = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.refund);
          this.currentfilvalShow = true;
        }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      },
    });
  }
  refundsearchadditional(filterValue: string) {
    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }

    this.service
    .RefundGetAllSearch(filterValue, this.pageSize, this.pageIndex, 2)
    .subscribe({
      next: (res: any) => {
        if (res.response) {
          this.additionalsearchdetails = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(
            this.additionalsearchdetails
          );
          this.currentfilvalShow = true;
        } else if (res.flag == 2) {
          this.additionalsearchdetails = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(
            this.additionalsearchdetails
          );
          this.currentfilvalShow = true;
        }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      },
    });
  }

  filterdate() {
    this.service
    .RefundGetAllDateFilter(
      this.FromDateRange,
      this.ToDateRange,
      this.pageSize,
      this.pageIndex,
      1
    )
    .subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.filterAction = 1;
      } else if (res.flag == 2) {
        this.transaction = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
      }
    });
  }
  filterdateadditional() {
    this.service
    .RefundGetAllDateFilter(
      this.FromDateRanges,
      this.ToDateRanges,
      this.pageSize,
      this.pageIndex,
      2
    )
    .subscribe((res: any) => {
      if (res.flag == 1) {
        this.datetransaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.datetransaction);
        this.filterActions = 1;
      } else if (res.flag == 2) {
        this.datetransaction = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.datetransaction);
      }
    });
  }
  reset() {
    this.filterAction = '';
    this.service
    .RefundGetAll(this.pageSize, this.pageIndex)
    .subscribe((res: any) => {
      if (res.flag == 1) {
        this.refund = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.refund);
        this.currentfilvalShow = false;
        this.FromDateRange = '';
        this.ToDateRange = '';
      } else if (res.flag == 2) {
        this.refund = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.refund);
        this.currentfilvalShow = false;
        this.FromDateRange = '';
        this.ToDateRange = '';
      }
    });
  }
  resetadditional() {
    this.filterActions = '';
    this.service
    .additionalRefundGetAll(this.pageSize, this.pageIndex)
    .subscribe((res: any) => {
      if (res.flag == 1) {
        this.additionaldetails = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.additionaldetails);
        this.currentfilvalShow = false;
        this.FromDateRanges = '';
        this.ToDateRanges = '';
      } else if (res.flag == 2) {
        this.additionaldetails = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.additionaldetails);
        this.currentfilvalShow = false;
      }
    });
  }
  getData(event: any) {
    if (this.filterAction == 1) {
      this.service
      .RefundGetAllDateFilter(
        this.FromDateRange,
        this.ToDateRange,
        event.pageSize,
        event.pageIndex,
        1
      )
      .subscribe((res: any) => {
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
      });
    } else if (this.currentfilvalShow) {
      this.service
      .RefundGetAllSearch(
        this.currentfilval,
        event.pageSize,
        event.pageIndex,
        1
      )
      .subscribe({
        next: (res: any) => {
          if (res.response) {
            this.refund = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.refund);
          } else if (res.flag == 2) {
            this.refund = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.refund);
          }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        },
      });
    } else {
      this.service
      .RefundGetAll(event.pageSize, event.pageIndex)
      .subscribe((res: any) => {
        if (res.flag == 1) {
          this.refund = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.refund);
        } else if (res.flag == 2) {
          this.refund = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.refund);
        }
      });
    }
  }
  getDataAdditional(event: any) {
    if (this.filterActions == 1) {
      this.service
      .RefundGetAllDateFilter(
        this.FromDateRanges,
        this.ToDateRanges,
        event.pageSize,
        event.pageIndex,
        2
      )
      .subscribe((res: any) => {
        if (res.flag == 1) {
          this.datetransaction = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.datetransaction);
        } else if (res.flag == 2) {
          this.datetransaction = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.datetransaction);
        }
      });
    } else if (this.currentfilvalShow) {
      this.service
      .RefundGetAllSearch(
        this.currentfilvals,
        event.pageSize,
        event.pageIndex,
        2
      )
      .subscribe({
        next: (res: any) => {
          if (res.response) {
            this.additionalsearchdetails = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(
              this.additionalsearchdetails
            );
          } else if (res.flag == 2) {
            this.additionalsearchdetails = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(
              this.additionalsearchdetails
            );
          }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        },
      });
    } else {
      this.service
      .additionalRefundGetAll(event.pageSize, event.pageIndex)
      .subscribe((res: any) => {
        if (res.flag == 1) {
          this.additionaldetails = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.additionaldetails);
        } else if (res.flag == 2) {
          this.additionaldetails = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.additionaldetails);
        }
      });
    }
  }
  transactionsDropdown(event: any) {
    this.selectedTransactionType = event.target.value;
    this.updateTableData();
    this.currentfilval = '';
    this.currentfilvals = '';
  }
  updateTableData() {
    if (this.selectedTransactionType === 'Due Transaction') {
      this.GetAll();
    } else if (this.selectedTransactionType === 'Additional Transaction') {
      this.getAdditional();
    }
  }
  checkDateadditional()
  {
    this.ToDateRanges=''
  }
}
