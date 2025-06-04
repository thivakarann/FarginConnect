import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { BranchOnlineviewComponent } from './branch-onlineview/branch-onlineview.component';
import { Location } from '@angular/common';
import moment from 'moment';
import { ViewadditionalpaymentsComponent } from '../../Fargin Transtions/additionalpayments/viewadditionalpayments/viewadditionalpayments.component';
@Component({
  selector: 'app-branch-onlinetransactions',
  templateUrl: './branch-onlinetransactions.component.html',
  styleUrl: './branch-onlinetransactions.component.css',
})
export class BranchOnlinetransactionsComponent {
  channel: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  responseDataListnew: any[] = [];
  response: any[] = [];
  displayedColumns: any[] = [
    'alcotId',
    'pgPaymentId',
    'customerName',
    'mobileNumber',
    'setupBoxNumber',
    'paidAmount',
    'paymentMethod',
    'createdDateTime',
    'status',
    'view',
    'Receipt',
    'paidAt',
  ];
  valuechannelAdd: any;
  getdashboard: any[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  actions: any;
  roleId: any = sessionStorage.getItem('roleId');
  valuechannelexport: any;
  valuechannelView: any;
  roleName = sessionStorage.getItem('roleName');
  channelexport: any;
  currentfilval: any;
  pageIndex1: number = 0;
  pageSize1 = 5;
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
  currentfilvalShow!: boolean;
  filter: boolean = false;
  Viewall: unknown[] | undefined;
  id: any;
  merchantId: any;
  transactionValue: any;
  searchPerformed: boolean = false;
  errorMessage: any;
  valueexport: any;
  viewallexport: any;
  selectedTransactionType: string = 'Due Transaction';
  additionalValue: any;
  dataSources: any;
  displayedadditionalColumns: any[] = [
    'alcotId',
    'pgPaymentId',
    'customerName',
    'mobileNumber',
    'setupBoxNumber',
    'quantity',
    'paidAmount',
    'paymentMethod',
    'createdDateTime',
    'status',
    'view',
    'Receipt',
    'paidAt',
  ];
  Viewadditionalall: any;
  currentfilvals: any;
  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private router: Router,
    private ActivateRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valueexport = 'Entity View Branch-Due View-Export';
          } else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;

              if (this.actions == 'Entity View Branch-Due View-Export') {
                this.valueexport = 'Entity View Branch-Due View-Export';
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
      this.merchantId = param.All;
    });

    this.Getall();
  }

  Getall() {
    this.service
    .NewOnlineBranch(this.id, this.pageSize, this.pageIndex)
    .subscribe((res: any) => {
      if (res.flag === 1) {
        this.transactionValue = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transactionValue);
        this.currentfilvalShow = false;
      } else if (res.flag === 2) {
        this.dataSource = new MatTableDataSource([]);
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.currentfilvalShow = false;
      }
    });
  }
  getAdditionalAll() {
    this.service
    .additionalBranchwiseTransaction(this.id, this.pageSize, this.pageIndex)
    .subscribe((res: any) => {
      if (res.flag === 1) {
        this.additionalValue = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSources = new MatTableDataSource(this.additionalValue);
        this.currentfilvalShow = false;
      } else if (res.flag === 2) {
        this.dataSources = new MatTableDataSource([]);
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.currentfilvalShow = false;
      }
    });
  }

  view(id: any) {
    this.router.navigate([`dashboard/channelconfiguration-singleview/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  channelsearch(filterValue: string) {
    if (filterValue) {
      this.service
      .NewOnlineBranchsearch(
        this.id,
        filterValue,
        this.pageSize,
        this.pageIndex,
        1
      )
      .subscribe({
        next: (res: any) => {
          if (res.response) {
            this.Viewall = res.response;
            // this.Viewall.reverse();
            this.dataSource = new MatTableDataSource(this.Viewall);
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.currentfilvalShow = true;
          } else if (res.flag === 2) {
            this.Viewall = [];
            this.dataSource = new MatTableDataSource(this.Viewall);
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
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
  additionalsearch(filterValues: string) {
    if (filterValues) {
      this.service
      .NewOnlineBranchsearch(
        this.id,
        filterValues,
        this.pageSize,
        this.pageIndex,
        2
      )
      .subscribe({
        next: (res: any) => {
          if (res.response) {
            this.Viewadditionalall = res.response;
            // this.Viewall.reverse();
            this.dataSources = new MatTableDataSource(this.Viewadditionalall);
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.currentfilvalShow = true;
          } else if (res.flag === 2) {
            this.Viewadditionalall = [];
            this.dataSources = new MatTableDataSource(this.Viewadditionalall);
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.currentfilvalShow = true;
          }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        },
      });
    } else if (!filterValues) {
      this.toastr.error('Please enter a value to search');
      return;
    }
  }
  getData(event: any) {
    if (this.currentfilvalShow) {
      this.service
      .NewOnlineBranchsearch(
        this.id,
        this.currentfilval,
        event.pageSize,
        event.pageIndex,
        1
      )
      .subscribe({
        next: (res: any) => {
          if (res.response) {
            this.Viewall = res.response;
            // this.Viewall.reverse();
            this.dataSource = new MatTableDataSource(this.Viewall);
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
          } else if (res.flag === 2) {
            this.Viewall = [];
            this.dataSource = new MatTableDataSource(this.Viewall);
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
          }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        },
      });
    } else {
      this.service
      .NewOnlineBranch(this.id, event.pageSize, event.pageIndex)
      .subscribe((res: any) => {
        if (res.flag === 1) {
          this.transactionValue = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.transactionValue);
        } else if (res.flag === 2) {
          this.dataSource = new MatTableDataSource([]);
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
        }
      });
    }
  }
  getAdditionalData(event: any) {
    if (this.currentfilvalShow) {
      this.service
      .NewOnlineBranchsearch(
        this.id,
        this.currentfilvals,
        event.pageSize,
        event.pageIndex,
        2
      )
      .subscribe({
        next: (res: any) => {
          if (res.response) {
            this.Viewadditionalall = res.response;
            // this.Viewall.reverse();
            this.dataSources = new MatTableDataSource(this.Viewadditionalall);
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
          } else if (res.flag === 2) {
            this.Viewadditionalall = [];
            this.dataSources = new MatTableDataSource(this.Viewadditionalall);
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
          }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        },
      });
    } else {
      this.service
      .additionalBranchwiseTransaction(this.id, event.pageSize, event.pageIndex)
      .subscribe((res: any) => {
        if (res.flag === 1) {
          this.additionalValue = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSources = new MatTableDataSource(this.additionalValue);
        } else if (res.flag === 2) {
          this.dataSources = new MatTableDataSource([]);
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
        }
      });
    }
  }
  View(id: any) {
    this.dialog.open(BranchOnlineviewComponent, {
      data: { value: id },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '800ms',
      disableClose: true,
    });
  }

  Receipt(id: any) {
    this.service.CustomerReceipt(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },
    });
  }
   additionalReceipt(id: any) {
    this.service.additionalpaymentsreceipts(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },
    });
  } additionalView(id: any) {
      this.dialog.open(ViewadditionalpaymentsComponent, {
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
        disableClose: true,
        data: {
          value: id,
        },
      });
    }
  close() {
    this.location.back();
  }

  exportexcel() {
    this.service.entitywithputbranchexport(this.id).subscribe((res: any) => {
      this.viewallexport = res.response;
      if (res.flag == 1) {
        let sno = 1;
        this.responseDataListnew = [];
        this.viewallexport.forEach((element: any) => {
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.pgPaymentId);

          this.response.push(element?.customerName);
          this.response.push(element?.mobileNumber);
          this.response.push(element?.setupBoxNumber);

          this.response.push(element?.paidAmount);
          this.response.push(element?.paymentMethod);
          this.response.push(element?.paymentStatus);

          if (element.paymentDateTime) {
            this.response.push(
              moment(element?.paymentDateTime)
              .format('DD/MM/yyyy hh:mm a')
              .toString()
            );
          } else {
            this.response.push('');
          }

          if (element.createdDateTime) {
            this.response.push(
              moment(element?.createdDateTime)
              .format('DD/MM/yyyy hh:mm a')
              .toString()
            );
          } else {
            this.response.push('');
          }

          sno++;
          this.responseDataListnew.push(this.response);
        });
        this.excelexportCustomer();
      }
    });
  }

  excelexportCustomer() {
    // const title='Entity Details';
    const header = [
      'S.No',
      'Payment ID',

      'Customer Name',
      'Mobile Number',
      'SetTopbox Number',
      'Paid Amount',
      'Payment Method',
      'Payment Status',
      'Paid At',
      'Due Generated At',
    ];

    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Branch Transaction');

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
      FileSaver.saveAs(blob, 'Branch Transaction.xlsx');
    });
  }
  transactionsDropdown(event: any) {
    this.selectedTransactionType = event.target.value;
    this.updateTableData();
    this.currentfilvals='';
    this.currentfilval='';
  }
  updateTableData() {
    if (this.selectedTransactionType === 'Due Transaction') {
      this.Getall();
    } else if (this.selectedTransactionType === 'Additional Transaction') {
      this.getAdditionalAll();
    }
  }
}
