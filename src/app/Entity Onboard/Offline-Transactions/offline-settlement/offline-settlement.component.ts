import { DatePipe, Location } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
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
    'Account Id',
    'paymentId',
    'ledgerid',
    'amount',
    'Reffer',
    'type',
    'View',
    'item',
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
  valuestaticsettlementExport: any;
  valuestaticsettlementView: any;
  maxDate: any;
  length: any;
  pageIndex: any;
  pageSize: any;
  filterAction: any = 0;

  constructor(
    private service: FarginServiceService,
    private ActivateRoute: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {

    const today = new Date();
    this.maxDate = moment(today).format('yyyy-MM-DD').toString();

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valuestaticsettlementExport = 'Entity View Static QR Payments-Settlement Export';
            this.valuestaticsettlementView = 'Entity View Static QR Payments-Settlement View';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Entity View Static QR Payments-Settlement Export') {
                this.valuestaticsettlementExport = 'Entity View Static QR Payments-Settlement Export';
              }
              if (this.actions == 'Entity View Static QR Payments-Settlement View') {
                this.valuestaticsettlementView = 'Entity View Static QR Payments-Settlement View';
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

    this.Getall();
  }

  checkDate() {
    this.ToDateRange = '';
  }

  Getall() {
    let submitModel: OfflineSettlement = {
      merchantId: this.accountId,
      pageNo: '0',
      size: '5',
      query: '',
      dateRange: this.Daterange,
    };
    this.service.OfflineSettlement(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.Viewall = JSON.parse(res.response);
        this.content = this.Viewall?.content;
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
  };
  
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


  filterdate() {
    const datepipe: DatePipe = new DatePipe("en-US");
    let formattedstartDate = datepipe.transform(this.FromDateRange, "dd/MM/YYYY HH:mm");
    let formattedendDate = datepipe.transform(this.ToDateRange, "dd/MM/yyyy HH:mm");
    this.Daterange = formattedstartDate + " " + "-" + " " + formattedendDate;
    let submitModel: OfflineSettlement = {
      merchantId: this.accountId,
      pageNo: this.currentPage,
      size: '5',
      query: '',
      dateRange: this.Daterange,
    };
    this.service.OfflineSettlement(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.Viewall = JSON.parse(res.response);
        this.content = this.Viewall?.content;
        this.filteredData = this.content;
        console.log(this.filteredData)
        this.length = this.Viewall.totalElements;
        this.pageIndex = this.Viewall.number;
        this.pageSize = this.Viewall.size;
        this.dataSource = new MatTableDataSource(this.filteredData);
        this.filterAction == 1;
        if (this.content.length === 0) {
          this.dataSource = new MatTableDataSource();
        };
      }
    });
  };


  viewpayout(id1: any) {
    this.router.navigate([`/dashboard/offile-settlement-payout/${id1}/${this.accountId}`],
      { queryParams: { value: id1, value1: this.accountId }, }
    );
  }

  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.filteredData.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.accountPayoutId);
      this.response.push(element?.amount);
      this.response.push(element?.txnType);
      this.response.push(element?.txnItem);
      if (element?.txnTime) {
        this.response.push(
          moment(element?.txnTime).format('DD/MM/yyyy hh:mm a')
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
      'Payment Id',
      'Amount',
      'Tnx Type',
      'Tnx Type',
      'Tnx At'
    ];

    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Offline Settlement');
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

    });
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', });
      FileSaver.saveAs(blob, 'Offline Settlement.xlsx');
    });
  }

  close() {
    this.location.back();
  }
  getData(event: any) {
    if (this.filterAction == 1) {
      const datepipe: DatePipe = new DatePipe("en-US");
      let formattedstartDate = datepipe.transform(this.FromDateRange, "dd/MM/YYYY HH:mm");
      let formattedendDate = datepipe.transform(this.ToDateRange, "dd/MM/yyyy HH:mm");
      this.Daterange = formattedstartDate + " " + "-" + " " + formattedendDate;
      let submitModel: OfflineSettlement = {
        merchantId: this.accountId,
        pageNo: event.pageIndex + 1,
        size: event.pageSize,
        query: '',
        dateRange: this.Daterange,
      };
      this.service.OfflineSettlement(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.Viewall = JSON.parse(res.response);
          this.content = this.Viewall?.content;
          this.filteredData = this.content;
          this.length = this.Viewall.totalElements;
          this.pageIndex = this.Viewall.number;
          this.pageSize = this.Viewall.size;
          this.dataSource = new MatTableDataSource(this.filteredData);
          if (this.content.length === 0) {
            this.dataSource = new MatTableDataSource();
          };
        }
      });
    }
    else {
      let submitModel: OfflineSettlement = {
        merchantId: this.accountId,
        pageNo: event.pageIndex + 1,
        size: event.pageSize,
        query: '',
        dateRange: this.Daterange,
      };
      this.service.OfflineSettlement(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.Viewall = JSON.parse(res.response);
          this.content = this.Viewall?.content;
          this.filteredData = this.content;
          this.length = this.Viewall.totalElements;
          this.pageIndex = this.Viewall.number;
          this.pageSize = this.Viewall.size;
          this.dataSource = new MatTableDataSource(this.filteredData);
          if (this.content.length === 0) {
            this.dataSource = new MatTableDataSource();
          };
        }
      });
    }
  }

}
