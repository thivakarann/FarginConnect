import { DatePipe, Location } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { OfflineSettlement } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-offline-settlement',
  templateUrl: './offline-settlement.component.html',
  styleUrl: './offline-settlement.component.css',
})
export class OfflineSettlementComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'accountId',
    'paymentId',
    'entityname',
    'reference',
    'ordrnum',
    'amount',
    'paystatus',
    'paidAt',
    'status',
    'view',
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
  valuestaticsettlementExport: any;
  valuestaticsettlementView: any;
  maxDate: any;

  constructor(
    private service: FarginServiceService,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
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
            this.valuestaticsettlementExport =
              'Entity View Static QR Payments-Settlement Export';
            this.valuestaticsettlementView =
              'Entity View Static QR Payments-Settlement View';
          } else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (
                this.actions ==
                'Entity View Static QR Payments-Settlement Export'
              ) {
                this.valuestaticsettlementExport =
                  'Entity View Static QR Payments-Settlement Export';
              }
              if (
                this.actions == 'Entity View Static QR Payments-Settlement View'
              ) {
                this.valuestaticsettlementView =
                  'Entity View Static QR Payments-Settlement View';
              }
            }
          }
        } else {
          this.errorMessage = res.responseMessage;
        }
      },
    });

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.accountId = param.Alldata;
    });

    let submitModel: OfflineSettlement = {
      accountId: this.accountId,
      pageNo: this.currentPage,
      size: '20',
      query: '',
      dateRange: this.Daterange,
    };
    this.service.OfflineSettlement(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.Viewall = JSON.parse(res.response);
        this.content = this.Viewall?.content;
        this.filteredData = this.content;
        this.dataSource = new MatTableDataSource(this.filteredData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  checkDate() {
    this.ToDateRange = '';
    // this.FromDateRange =''
  }

  reload() {
    let submitModel: OfflineSettlement = {
      accountId: this.accountId,
      pageNo: this.currentPage,
      size: '20',
      query: '',
      dateRange: '',
    };
    this.service.OfflineSettlement(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.Viewall = JSON.parse(res.response);
        this.content = this.Viewall?.content;
        this.filteredData = this.content;
        this.dataSource = new MatTableDataSource(this.filteredData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

  renderPage(event: any) {
    this.currentPage = event;
    this.ngOnInit();
  }
  reloaddata() {
    this.FromDateRange = '';
    this.ToDateRange = '';
    this.Daterange = '';
    this.currentPage = 1;
    this.ngOnInit();
  }

  filterdate() {
    const datepipe: DatePipe = new DatePipe('en-US');
    let formattedstartDate = datepipe.transform(
      this.FromDateRange,
      'dd/MM/YYYY HH:mm'
    );
    let formattedendDate = datepipe.transform(
      this.ToDateRange,
      'dd/MM/YYYY HH:mm'
    );
    this.Daterange = formattedstartDate + ' ' + '-' + ' ' + formattedendDate;
    this.currentPage = 1;

    let submitModel: OfflineSettlement = {
      accountId: this.accountId,
      pageNo: this.currentPage,
      size: '20',
      query: '',
      dateRange: this.Daterange,
    };
    this.service.OfflineSettlement(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.Viewall = JSON.parse(res.response);
        this.content = this.Viewall?.content;
        this.filteredData = this.content;
        this.toastr.success(res.responseMessage);
      }
    });
  }
  reset() {
    let submitModel: OfflineSettlement = {
      accountId: this.accountId,
      pageNo: this.currentPage,
      size: '20',
      query: '',
      dateRange: '',
    };
    this.service.OfflineSettlement(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.Viewall = JSON.parse(res.response);
        this.content = this.Viewall?.content;
        this.filteredData = this.content;
       this.dataSource = new MatTableDataSource(this.filteredData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.FromDateRange = '';
        this.ToDateRange = '';
      } else {
        this.FromDateRange = '';
        this.ToDateRange = '';
      }
    });
  }

  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.filteredData.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.accountId);
      this.response.push(element?.paymentId);
      this.response.push(element?.terminalId);
      this.response.push(element?.bankReference);
      this.response.push(element?.merchantOrderNo);
      this.response.push(element?.amount);

      if (element?.transaction?.success == 'true') {
        this.response.push(element?.Success);
      } else if (element?.transaction?.success != 'true') {
        this.response.push(element?.Failure);
      }
      if (element?.paidAt) {
        this.response.push(
          moment(element?.paidAt).format('DD/MM/yyyy hh:mm a')
        );
      } else {
        this.response.push('');
      }
      this.response.push(element?.status);

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
      'Terminal ID',
      'Bank Reference',
      'Merchant Order Number',
      'Amount',
      'Payment Status',
      'Paid At',
      'Status',
    ];

    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Entity Transactions');
    // Blank Row
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
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, 'Offline Settlement.xlsx');
    });
  }

  close() {
    this.location.back();
  }
}
