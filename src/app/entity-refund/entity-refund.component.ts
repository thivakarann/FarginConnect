import { Component, ElementRef, ViewChild } from '@angular/core';
import { FarginServiceService } from '../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { EntityOfflineviewComponent } from '../Entity Onboard/entity-offlineview/entity-offlineview.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-entity-refund',
  templateUrl: './entity-refund.component.html',
  styleUrl: './entity-refund.component.css',
})
export class EntityRefundComponent {
  dataSource: any;
  dataSources: any;
  displayedColumns: string[] = [
    'sno',
    'setupbox',
    'custname',
    'custmobile',
    'type',
    'reqid',
    'pgPaymentId',
    'paidAmount',
    'refund',
    'status',
    'View',
    'createdAt',
  ];
  displayedAdditionalColumns: string[] = [
    'sno',
    'category',
    'quantity',
    'custname',
    'custmobile',
    'type',
    'reqid',
    'pgPaymentId',
    'paidAmount',
    'refund',
    'status',
    'View',
    'createdAt',
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
  filter1: boolean = false;
  filter2: boolean = false;
  currentfilval: any;
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  refundexport: any;
  vaalueonlinerefundexport: any;
  pageIndex2: number = 0;
  pageSize2 = 5;

  totalpage2: any;
  totalPages2: any;
  currentpage2: any;
  ToDateRange: any;
  FromDateRange: any;
  transaction: any;
  vaaluedetails: any;
  currentfilvalShow: boolean = false;
  maxDate: any;
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
  id: any;
  valueview: any;
  valueexport: any;
  errorMessage: any;
  constructor(
    public service: FarginServiceService,
    private ActivateRoute: ActivatedRoute,
    private Location: Location,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valueview = 'Entity View Refund-View';
            this.valueexport = 'Entity View Refund-Export';
          } else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Entity View Refund-View') {
                this.valueview = 'Entity View Refund-View';
              }
              if (this.actions == 'Entity View Refund-Export') {
                this.valueexport = 'Entity View Refund-Export';
              }
            }
          }
        } else {
          this.errorMessage = res.responseMessage;
        }
      },
    });

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.GetAll();
  }

  GetAll() {
    this.service
    .RefundForMerchantView(this.id, this.pageSize, this.pageIndex)
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
    .refundadditionalgetall(this.id, this.pageSize, this.pageIndex)
    .subscribe((res: any) => {
      if (res.flag == 1) {
        this.additionaldetails = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSources = new MatTableDataSource(this.additionaldetails);
        this.currentfilvalShow = false;
      } else if (res.flag == 2) {
        this.additionaldetails = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSources = new MatTableDataSource(this.additionaldetails);
        this.currentfilvalShow = false;
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  view(id: any) {
    this.dialog.open(EntityOfflineviewComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { value: id },
      disableClose: true,
    });
  }

  close() {
    this.Location.back();
  }
  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.transaction.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(
        element?.paymentModel?.customerStbId?.stbId?.setupBoxNumber
      );
      this.response.push(element?.customerId?.customerName);
      this.response.push(element?.customerId?.mobileNumber);
      this.response.push(element?.typeMode);
      this.response.push(element?.requestId);
      this.response.push(element?.paymentId);
      this.response.push(element?.paymentModel?.paidAmount);
      this.response.push(element?.refundAmount);
      this.response.push(element?.refundStatus);
      if (element.createdAt) {
        this.response.push(
          moment(element?.createdAt).format('DD/MM/yyyy hh:mm a').toString()
        );
      } else {
        this.response.push('');
      }
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    // const title='Entity Details';
    const header = [
      'SNo',
      'Setupbox',
      'CustomerName',
      'CustomerMobile',
      'Type',
      'Request ID',
      'Payment ID',
      'PaidAmount',
      'RefundAmount',
      'Status',
      'Requested Date',
    ];

    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Entity Refund');

    // let titleRow = worksheet.addRow([title]);
    // titleRow.font = { name: 'Times New Roman', family: 4, size: 16, bold: true };

    worksheet.addRow([]);
    let headerRow = worksheet.addRow(header);
    headerRow.font = { bold: true };
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFFFF' },
        bgColor: { argb: 'FF0000FF' },
      };

      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    data.forEach((d: any) => {
      //

      let row = worksheet.addRow(d);
      let qty = row.getCell(1);
      let qty1 = row.getCell(2);
      let qty2 = row.getCell(3);
      let qty3 = row.getCell(4);
      let qty4 = row.getCell(5);
      let qty5 = row.getCell(6);
      let qty6 = row.getCell(7);
      let qty7 = row.getCell(8);
      let qty8 = row.getCell(9);
      let qty9 = row.getCell(10);
      let qty10 = row.getCell(11);

      qty.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty1.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty2.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty3.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty4.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty5.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty6.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty7.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty8.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty9.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty10.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, 'Entity Refund.xlsx');
    });
  }
  reload() {
    this.GetAll();
  }
  reloadforadditional() {
    this.getAdditional();
  }
  refundsearch(filterValue: string) {
    if (filterValue) {
      this.service
      .RefundForMerchantsearch(
        this.id,
        filterValue,
        this.pageSize,
        this.pageIndex,
        1
      )
      .subscribe({
        next: (res: any) => {
          if (res.flag == 1) {
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
    } else if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
  }
  additionalrefundsearch(filterValue: string) {
    if (filterValue) {
      this.service
      .RefundForMerchantsearch(
        this.id,
        filterValue,
        this.pageSize,
        this.pageIndex,
        2
      )
      .subscribe({
        next: (res: any) => {
          if (res.flag == 1) {
            this.additionalsearchdetails = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSources = new MatTableDataSource(
              this.additionalsearchdetails
            );
            this.currentfilvalShow = true;
          } else if (res.flag == 2) {
            this.additionalsearchdetails = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSources = new MatTableDataSource(
              this.additionalsearchdetails
            );
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
  filterdate() {
    this.service
    .OnlineRfundsDateFilter(
      this.id,
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
  filteradditionaldate() {
    this.service
    .OnlineRfundsDateFilter(
      this.id,
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
        this.dataSources = new MatTableDataSource(this.datetransaction);
        this.filterActions = 1;
      } else if (res.flag == 2) {
        this.datetransaction = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSources = new MatTableDataSource(this.datetransaction);
      }
    });
  }
  reset() {
    this.filterAction = '';
    this.service
    .RefundForMerchantView(this.id, this.pageSize, this.pageIndex)
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
    .refundadditionalgetall(this.id, this.pageSize, this.pageIndex)
    .subscribe((res: any) => {
      if (res.flag == 1) {
        this.additionaldetails = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSources = new MatTableDataSource(this.additionaldetails);
        this.currentfilvalShow = false;
        this.FromDateRanges = '';
        this.ToDateRanges = '';
      } else if (res.flag == 2) {
        this.additionaldetails = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSources = new MatTableDataSource(this.additionaldetails);
        this.currentfilvalShow = false;
      }
    });
  }
  getData(event: any) {
    if (this.filterAction == 1) {
      this.service
      .OnlineRfundsDateFilter(
        this.id,
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
          this.dataSource = new MatTableDataSource(this.refund);
        }
      });
    } else if (this.currentfilvalShow) {
      this.service
      .RefundForMerchantsearch(
        this.id,
        this.currentfilval,
        event.pageSize,
        event.pageIndex,
        1
      )
      .subscribe({
        next: (res: any) => {
          if (res.flag == 1) {
            this.refund = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.refund);
          } else if (res.flag == 2) {
            this.transaction = [];
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
      .RefundForMerchantView(this.id, event.pageSize, event.pageIndex)
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
      .OnlineRfundsDateFilter(
        this.id,
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
          this.dataSources = new MatTableDataSource(this.datetransaction);
        } else if (res.flag == 2) {
          this.datetransaction = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSources = new MatTableDataSource(this.datetransaction);
        }
      });
    } else if (this.currentfilvalShow) {
      this.service
      .RefundForMerchantsearch(
        this.id,
        this.currentfilvals,
        event.pageSize,
        event.pageIndex,
        2
      )
      .subscribe({
        next: (res: any) => {
          if (res.flag == 1) {
            this.additionalsearchdetails = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSources = new MatTableDataSource(
              this.additionalsearchdetails
            );
          } else if (res.flag == 2) {
            this.additionalsearchdetails = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSources = new MatTableDataSource(
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
      .refundadditionalgetall(this.id, event.pageSize, event.pageIndex)
      .subscribe((res: any) => {
        if (res.flag == 1) {
          this.additionaldetails = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSources = new MatTableDataSource(this.additionaldetails);
        } else if (res.flag == 2) {
          this.additionaldetails = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSources = new MatTableDataSource(this.additionaldetails);
        }
      });
    }
  }

  checkDate() {
    this.ToDateRange = '';
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
}
