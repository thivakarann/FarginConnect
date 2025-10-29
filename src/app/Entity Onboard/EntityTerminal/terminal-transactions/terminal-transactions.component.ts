import { Component, ElementRef, ViewChild } from '@angular/core';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ActivatedRoute} from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { entityterminaltransaction } from '../../../fargin-model/fargin-model.module';
import { ToastrService } from 'ngx-toastr';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-terminal-transactions',
  templateUrl: './terminal-transactions.component.html',
  styleUrl: './terminal-transactions.component.css',
})
export class TerminalTransactionsComponent {
  dataSource!: MatTableDataSource<any>;
  merchantId: any = sessionStorage.getItem('merchantId');
 
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
roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  accountId: any = sessionStorage.getItem('accountId');
  searchPerformed: boolean = false;
  actions: any;
  errorMessage: any;
  id: any;
  Button: boolean = false;
  valuestaticview: any;
  roleName = sessionStorage.getItem('roleName');
  valuestaticexport: any;
  terminalId: any;
  maxDate: any;
  filterShow: any = 0;
  pageIndex: any;
  pageSize: any;
  length: any;
    filterAction:any = 0;
  constructor(
    private service: FarginServiceService,
    private ActivateRoute: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
    private cryptoService:EncyDecySericeService,

  ) { }

  ngOnInit(): void {
   const today = new Date();
    this.maxDate = moment(today).format('yyyy-MM-DD').toString();
 
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.merchantId = param.Alldata1;
      this.terminalId = param.Alldata;
    });
 
    let submitModel: entityterminaltransaction = {
      pageNo: '0',
      query: '',
      size: '5',
      dateRange: this.Daterange,
      status: '',
      merchantId: this.merchantId,
      entityTerminalId: this.terminalId,
    };
    this.service
    .EntityTerminalTransactions(submitModel)
    .subscribe((res: any) => {
      if (res.flag == 1) {
        this.Viewall = JSON.parse(res.response);
        this.content = this.Viewall?.content || [];
        console.log(this.content);
        this.filteredData = this.content;
        this.length = this.Viewall.totalElements;
        this.pageIndex = this.Viewall.number;
        this.pageSize = this.Viewall.size;
        this.dataSource = new MatTableDataSource(this.filteredData);
 
this.filterAction = 0;
        if (this.content.length === 0) {
          this.dataSource = new MatTableDataSource();
        }
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
  reload() {
    let submitModel: entityterminaltransaction = {
      pageNo: this.currentPage,
      query: '',
      size: '20',
      dateRange: '',
      status: this.Daterange,
      merchantId: this.merchantId,
      entityTerminalId: this.terminalId,
    };
    this.service
      .EntityTerminalTransactions(submitModel)
      .subscribe((res: any) => {
        if (res.flag == 1) {
          this.Viewall = JSON.parse(res.response);
          this.content = this.Viewall?.content || [];
          console.log(this.content);
          this.filteredData = this.content;
          this.length = this.Viewall.totalElements;
          this.pageIndex = this.Viewall.number;
          this.pageSize = this.Viewall.size;
          this.dataSource = new MatTableDataSource(this.filteredData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

          this.filterAction = 0;


          if (this.content.length === 0) {
            this.dataSource = new MatTableDataSource();
          }
        }
      });
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
        'dd/MM/yyyy HH:mm'
    );
    this.Daterange = formattedstartDate + ' ' + '-' + ' ' + formattedendDate;
 
    this.currentPage = 0;
 
    let submitModel: entityterminaltransaction = {
      pageNo: this.currentPage,
      query: '',
      size: '5',
      dateRange: this.Daterange,
      status: '',
      merchantId: this.merchantId,
      entityTerminalId: this.terminalId,
    };
    this.service
      .EntityTerminalTransactions(submitModel)
      .subscribe((res: any) => {
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
  reset() {
    this.Daterange = '';
    let submitModel: entityterminaltransaction = {
      pageNo: '0',
      query: '',
      size: '5',
      dateRange: this.Daterange,
      status: '',
      merchantId: this.merchantId,
      entityTerminalId: this.terminalId,
    };
    this.service
      .EntityTerminalTransactions(submitModel)
      .subscribe((res: any) => {
        if (res.flag == 1) {
          this.Viewall = JSON.parse(res.response);
          this.content = this.Viewall?.content || [];
          console.log(this.content);
          this.filteredData = this.content;
          this.length = this.Viewall.totalElements;
          this.pageIndex = this.Viewall.number;
          this.pageSize = this.Viewall.size;
          this.dataSource = new MatTableDataSource(this.filteredData);

          this.FromDateRange = '';
          this.ToDateRange = '';
          this.filterAction = 0;


          if (this.content.length === 0) {
            this.dataSource = new MatTableDataSource();
          }
        }
      });
  }

  exportexcel(data:any[]) {
    let sno = 1;
    this.responseDataListnew = [];
    data.forEach((element: any) => {
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
      if (element?.createdAt) {
        this.response.push(
          moment(element?.createdAt).format('DD/MM/yyyy hh:mm a')
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
    let worksheet = workbook.addWorksheet('Transactions');
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
      FileSaver.saveAs(blob, 'Transaction.xlsx');
    });
  }
 
  viewsuccess(id: any, id1: any) {}
 
  viewFailure(id: any, id1: any) {}
 
  close() {
    this.location.back();
  }
  checkDate() {
    this.ToDateRange = '';
    // this.FromDateRange =''
  }
 
  getData(event: any) {
    if (this.filterAction==1) {
      const datepipe: DatePipe = new DatePipe('en-US');
      let formattedstartDate = datepipe.transform(
        this.FromDateRange,
        'dd/MM/YYYY HH:mm'
      );
      let formattedendDate = datepipe.transform(
        this.ToDateRange,
        'dd/MM/yyyy HH:mm'
      );
      this.Daterange = formattedstartDate + ' ' + '-' + ' ' + formattedendDate;
 
 
      let submitModel: entityterminaltransaction = {
        pageNo: event.pageIndex + 1,
        query: '',
        size: event.pageSize,
        dateRange: this.Daterange,
        status: '',
        merchantId: this.merchantId,
        entityTerminalId: this.terminalId,
      };
      this.service
        .EntityTerminalTransactions(submitModel)
        .subscribe((res: any) => {
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
    } else {
      let submitModel: entityterminaltransaction = {
        pageNo: event.pageIndex + 1,
        query: '',
        size: event.pageSize,
        dateRange: this.Daterange,
        status: '',
        merchantId: this.merchantId,
        entityTerminalId: this.terminalId,
      };
      this.service
        .EntityTerminalTransactions(submitModel)
        .subscribe((res: any) => {
          if (res.flag == 1) {
            this.Viewall = JSON.parse(res.response);
            this.content = this.Viewall?.content || [];
            console.log(this.content);
            this.filteredData = this.content;
            this.length = this.Viewall.totalElements;
            this.pageIndex = this.Viewall.number;
            this.pageSize = this.Viewall.size;

            this.dataSource = new MatTableDataSource(this.filteredData);

            this.filterAction = 0;


            if (this.content.length === 0) {
              this.dataSource = new MatTableDataSource();
            }
          }
        });
    }
  }


  exportData() {

    if(this.length != 0){
      if (this.filterAction == 1) {
      const datepipe: DatePipe = new DatePipe('en-US');
      let formattedstartDate = datepipe.transform(
        this.FromDateRange,
        'dd/MM/YYYY HH:mm'
      );
      let formattedendDate = datepipe.transform(
        this.ToDateRange,
        'dd/MM/yyyy HH:mm'
      );
      this.Daterange = formattedstartDate + ' ' + '-' + ' ' + formattedendDate;


      let submitModel: entityterminaltransaction = {
        pageNo: 1,
        query: '',
        size: this.length,
        dateRange: this.Daterange,
        status: '',
        merchantId: this.merchantId,
        entityTerminalId: this.terminalId,
      };
      this.service
        .EntityTerminalTransactions(submitModel)
        .subscribe((res: any) => {
          if (res.flag == 1) {
            this.Viewall = JSON.parse(res.response);
            this.content = this.Viewall?.content || [];
            this.filteredData = this.content;
            this.exportexcel(this.filteredData)
          }
        });
    } else {
      let submitModel: entityterminaltransaction = {
        pageNo: 1,
        query: '',
        size: this.length,
        dateRange: this.Daterange,
        status: '',
        merchantId: this.merchantId,
        entityTerminalId: this.terminalId,
      };
      this.service
        .EntityTerminalTransactions(submitModel)
        .subscribe((res: any) => {
          if (res.flag == 1) {
            this.Viewall = JSON.parse(res.response);
            this.content = this.Viewall?.content || [];
            this.filteredData = this.content;
            this.exportexcel(this.filteredData)
          }
        });
    }
    }
    else{
      this.toastr.error('No record found');
    }

    
  }

}
