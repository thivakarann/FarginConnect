import { DatePipe, Location } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { OffilneTransaction } from '../../../fargin-model/fargin-model.module';
import { MerchantTransactionViewComponent } from '../../../Overall-Transactions/merchant-transaction-view/merchant-transaction-view.component';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessOfftransactionsComponent } from '../success-offtransactions/success-offtransactions.component';
import { FailureOfftransactionsComponent } from '../failure-offtransactions/failure-offtransactions.component';

@Component({
  selector: 'app-offline-transactions',
  templateUrl: './offline-transactions.component.html',
  styleUrl: './offline-transactions.component.css',
})
export class OfflineTransactionsComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'accountId',
    'paymentId',
    'entityname',
    'customername',
    'vpa',
    'ordrnum',
    'amount',
    'paystatus',
    'viewsuccess',
    'paidAt',
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
  valueTransactionExport: any;
  valueTransactionView: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId');
  actions: any;
  errorMessage: any;
  id: any;
  accountId: any;
  Button: boolean = false;
  AccountId: any;
  searchPerformed: boolean = false;
  valuestaticexport: any;
  valuestaticsettlement: any;
  valuestaticview: any;
  maxDate: any;
  length: any;
  pageIndex: any;
  pageSize: any;
  filterAction: any = 0;
  constructor(
    private service: FarginServiceService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {

    const today = new Date();
    this.maxDate = moment(today).format('yyyy-MM-DD').toString();

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valuestaticexport = 'Entity View Offline-Export';
            this.valuestaticsettlement = 'Entity View Offline-Settlement';
            this.valuestaticview = 'Entity View Offline-View';
          } else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Entity View Offline-Export') {
                this.valuestaticexport = 'Entity View Offline-Export';
              }
              if (this.actions == 'Entity View Offline-Settlement') {
                this.valuestaticsettlement = 'Entity View Offline-Settlement';
              }
              if (this.actions == 'Entity View Offline-View') {
                this.valuestaticview = 'Entity View Offline-View';
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
      this.accountId = param.Alldata1;
    });

    this.Getall();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Getall() {

    let submitModel: OffilneTransaction = {
      merchantId: this.id,
      pageNo: '0',
      size: '5',
      query: '',
      dateRange: this.Daterange,
      status: '',
      terminalId: '',
    };
    this.service.OfflineTransactions(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.Viewall = JSON.parse(res.response);
        this.content = this.Viewall?.content || [];
        console.log(this.content);
        this.filteredData = this.content;
        this.length = this.Viewall.totalElements;
        this.pageIndex = this.Viewall.number;
        this.pageSize = this.Viewall.size;
        this.dataSource = new MatTableDataSource(this.filteredData);
        if (this.content.length === 0) {
          this.dataSource = new MatTableDataSource();
        };
        this.filterAction = 0;
        this.FromDateRange = '';
        this.ToDateRange = '';
        this.Daterange = '';
      }
    });
  }

  renderPage(event: any) {
    this.currentPage = event;
    this.ngOnInit();
  }

  filterdate() {
    const datepipe: DatePipe = new DatePipe('en-US');
    let formattedstartDate = datepipe.transform(this.FromDateRange, 'dd/MM/YYYY HH:mm');
    let formattedendDate = datepipe.transform(this.ToDateRange, 'dd/MM/yyyy HH:mm');
    this.Daterange = formattedstartDate + ' ' + '-' + ' ' + formattedendDate;
    let submitModel: OffilneTransaction = {
      merchantId: this.id,
      pageNo: this.currentPage,
      size: '5',
      query: '',
      dateRange: this.Daterange,
      status: '',
      terminalId: '',
    };
    this.service.OfflineTransactions(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.Viewall = JSON.parse(res.response);
        this.content = this.Viewall?.content || [];
        this.filteredData = this.content;
        this.length = this.Viewall.totalElements;
        this.pageIndex = this.Viewall.number;
        this.pageSize = this.Viewall.size;
        this.dataSource = new MatTableDataSource(this.filteredData);
        this.filterAction = 1;
        if (this.content.length === 0) {
          this.dataSource = new MatTableDataSource();
        }
      }
    });
  }

  checkDate() {
    this.ToDateRange = '';
  }

  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.filteredData.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.accountId);
      this.response.push(element?.id);
      this.response.push(element?.terminalId);
      this.response.push(element?.customer);
      this.response.push(element?.vpa);
      this.response.push(element?.merchantOrderNo);
      this.response.push(element?.amount);
      if (element?.completed == 'ATTEMPTED') {
        this.response.push(element?.completed);
      } else if (element?.completed == 'SUCCESS') {
        this.response.push(element?.completed);
      } else {
        this.response.push(element?.completed);
      }
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
    // const title='Business Category';
    const header = [
      'S No',
      'Account Id',
      'Payment Id',
      'Terminal Id',
      'Customer Name',
      'VPA',
      'Merchant Order Number',
      'Amount',
      'Payment Status',
      'Paid At',
    ];

    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Static Qr Transactions');
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
    });
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', });
      FileSaver.saveAs(blob, 'Static QR Transaction.xlsx');
    });
  }

  transactionview() {
    this.dialog.open(MerchantTransactionViewComponent);
  }

  viewsuccess(id: any, id1: any) {
    this.dialog.open(SuccessOfftransactionsComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: this.id, value1: id1, },
    });
  }

  viewFailure(id: any, id1: any) {
    this.dialog.open(FailureOfftransactionsComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: {
        value: this.id,
        value1: id1,
      },
    });
  }

  close() {
    this.location.back();
  }
  settlement() {
    this.router.navigate([`dashboard/offline-settlement`], {
      queryParams: {
        Alldata: this.id,
      },
    });
  }

  getData(event: any) {
    if (this.filterAction == 1) {
      const datepipe: DatePipe = new DatePipe('en-US');
      let formattedstartDate = datepipe.transform(this.FromDateRange, 'dd/MM/YYYY HH:mm');
      let formattedendDate = datepipe.transform(this.ToDateRange, 'dd/MM/yyyy HH:mm');
      this.Daterange = formattedstartDate + ' ' + '-' + ' ' + formattedendDate;
      let submitModel: OffilneTransaction = {
        merchantId: this.id,
        pageNo: event.pageIndex + 1,
        size: event.pageSize,
        query: '',
        dateRange: this.Daterange,
        status: '',
        terminalId: '',
      };
      this.service.OfflineTransactions(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.Viewall = JSON.parse(res.response);
          this.content = this.Viewall?.content || [];
          this.filteredData = this.content;
          this.length = this.Viewall.totalElements;
          this.pageIndex = this.Viewall.number;
          this.pageSize = this.Viewall.size;
          this.dataSource = new MatTableDataSource(this.filteredData);
          if (this.content.length === 0) {
            this.dataSource = new MatTableDataSource();
          }
        }
      });
    } else {
      let submitModel: OffilneTransaction = {
        merchantId: this.id,
        pageNo: event.pageIndex + 1,
        size: event.pageSize,
        query: '',
        dateRange: this.Daterange,
        status: '',
        terminalId: '',
      };
      this.service.OfflineTransactions(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.Viewall = JSON.parse(res.response);
          this.content = this.Viewall?.content || [];
          console.log(this.content);
          this.filteredData = this.content;
          this.length = this.Viewall.totalElements;
          this.pageIndex = this.Viewall.number;
          this.pageSize = this.Viewall.size;
          this.dataSource = new MatTableDataSource(this.filteredData);
          if (this.content.length === 0) {
            this.dataSource = new MatTableDataSource();
          }
        }
      });
    }
  }
}
