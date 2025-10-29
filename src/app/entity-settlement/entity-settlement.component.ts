import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FarginServiceService } from '../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { OfflineSettlement, settlement } from '../fargin-model/fargin-model.module';
import { Location } from '@angular/common';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import { DatePipe } from '@angular/common';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { EncyDecySericeService } from '../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-entity-settlement',
  templateUrl: './entity-settlement.component.html',
  styleUrl: './entity-settlement.component.css',
})
export class EntitySettlementComponent {
  valuesettlement: any;
  valuesettlementview: any;
  valuesettlementexport: any;
  errorMessage: any;
  [x: string]: any;
  dataSource: any;
  dataSourcesoffline: any;
  displayedColumns: string[] = [
    'settlementId',
    'accoundid',
    'payoutId',
    'benificiary',
    'amount',
    'reference',
    'View',
    'txnItem',
    'createdAt',
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
  id: any;
  showcategoryData: boolean = false;
  viewdata: any;
  details: any;
  detaislone: any;
  bankdetails: any;
  accountid: any;
  Viewall: any;
  Viewalloffline: any;
  getdashboard: any[] = [];
roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  actions: any;
  responseDataListnew: any = [];
  responseDataListnewoffline: any = [];
  response: any = [];
   offlineresponse: any = [];
  searchPerformed: boolean = false;
  searchPerformedoffline: boolean = false;
  FromDateRange!: string;
  FromDateRangeoffline!: string;
  currentPage: any;
  ToDateRange!: string;
  ToDateRangeoffline!: string;
  Daterange!: string;
  DaterangeOffline!: string;
  content: any;
  contentoffline: any;
  filteredData: any;
  maxDate: any;
  merchantid: any;
  length: any;
  lengthoffline: any;
  pageIndex: any;
  pageIndexoffline: any;
  pageSize: any;
  pageSizeoffline: any;
  datas: any;
  datasOffline: any;
  filterAction: any = 0;
  filterActionoffline: any = 0;
  selectedLang!: string;
  selectedTransactionType: string = 'Online Settlement';


  displayedOfflineColumns: string[] = [
    'settlementIds',
    'accoundids',
    'payoutIds',
    'benificiarys',
    'amounts',
    'references',
    'Views',
    'txnItems',
    'createdAts',
  ];

  constructor(
    public MerchantView: FarginServiceService,
    private router: Router,
    private ActivateRoute: ActivatedRoute,
    private Location: Location,
    private toastr: ToastrService,
    private cryptoService:EncyDecySericeService,


  ) { }

  ngOnInit(): void {

    const today = new Date();
    this.maxDate = moment(today).format('yyyy-MM-DD').toString();

    this.MerchantView.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valuesettlementexport = 'Entity View Settlement-Export';
            this.valuesettlementview = 'Entity View Settlement-View';
          } else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Entity View Settlement-Export') {
                this.valuesettlementexport = 'Entity View Settlement-Export';
              }
              if (this.actions == 'Entity View Settlement-View') {
                this.valuesettlementview = 'Entity View Settlement-View';
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

    this.MerchantView.EntityViewbyid(this.id).subscribe((res: any) => {
      this.details = res.response;
      this.detaislone = res.response.merchantpersonal;
      this.accountid = res.response.merchantpersonal.accountId;
      this.merchantid = res.response.merchantpersonal.merchantId;
      this.postrenewal();
    });
  }

  viewpayout(id2: any, id1: any) {
    this.router.navigate([`/dashboard/settlement-view/${id2}/${id1}/${this.id}`],
      { queryParams: { value: id2, value1: id1, value2: this.id }, }
    );
  }

  viewOfflinepayout(id1: any) {
    this.router.navigate([`/dashboard/offlinesettlement-payout/${id1}/${this.id}`],
      { queryParams: { value: id1, value1: this.id } }
    );
  }

  close() {
    this.Location.back();
  }

  checkDate() {
    this.ToDateRange = '';
  };

  postrenewal() {
    let submitModel: settlement = {
      merchantId: this.id,
      pageNo: '0',
      size: '5',
      query: '',
      dateRange: this.Daterange,
      status: '',
    };
    this.MerchantView.Entitysettlement(submitModel).subscribe((res: any) => {
      this.Viewall = JSON.parse(res.response);
      this.content = this.Viewall?.data?.content || [];
      this.filteredData = this.content;
      this.datas = this.Viewall.data;
      this.length = this.datas.totalElements;
      this.pageIndex = this.datas.number;
      this.pageSize = this.datas.size;
      this.dataSource = new MatTableDataSource(this.filteredData);
      this.filterAction = 0;

      if (this.content.length === 0) {
        this.dataSource = new MatTableDataSource();
      }
    });
  };



  resetFilter() {
    this.filterAction = 0;
    this.FromDateRange = '';
    this.ToDateRange = '';
    this.Daterange = '';
    this.postrenewal();
  };



  filterdate() {
    const datepipe: DatePipe = new DatePipe('en-US');
    let formattedstartDate = datepipe.transform(this.FromDateRange, 'dd/MM/YYYY HH:mm');
    let formattedendDate = datepipe.transform(this.ToDateRange, 'dd/MM/yyyy HH:mm');
    this.Daterange = formattedstartDate + ' ' + '-' + ' ' + formattedendDate;
    let submitModel: settlement = {
      merchantId: this.id,
      pageNo: this.currentPage,
      size: '5',
      query: '',
      dateRange: this.Daterange,
      status: '',
    };
    this.MerchantView.Entitysettlement(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.Viewall = JSON.parse(res.response);
        this.content = this.Viewall?.data?.content;
        this.filteredData = this.content;
        this.datas = this.Viewall.data;
        this.length = this.datas.totalElements;
        this.pageIndex = this.datas.number;
        this.pageSize = this.datas.size;
        this.dataSource = new MatTableDataSource(this.filteredData);
        this.filterAction = 1;
        if (this.content.length === 0) {
          this.dataSource = new MatTableDataSource();
        }
      }
    });
  };

  getData(event: any) {
    if (this.filterAction == 1) {
      const datepipe: DatePipe = new DatePipe('en-US');
      let formattedstartDate = datepipe.transform(this.FromDateRange, 'dd/MM/YYYY HH:mm');
      let formattedendDate = datepipe.transform(this.ToDateRange, 'dd/MM/yyyy HH:mm');
      this.Daterange = formattedstartDate + ' ' + '-' + ' ' + formattedendDate;
      let submitModel: settlement = {
        merchantId: this.id,
        pageNo: event.pageIndex + 1,
        size: event.pageSize,
        query: '',
        dateRange: this.Daterange,
        status: '',
      };
      this.MerchantView.Entitysettlement(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.Viewall = JSON.parse(res.response);
          this.content = this.Viewall?.data?.content;
          this.datas = this.Viewall.data;
          this.length = this.datas.totalElements;
          this.pageIndex = this.datas.number;
          this.pageSize = this.datas.size;
          this.dataSource = new MatTableDataSource(this.content);

          this.filterAction = 1;
          if (this.content.length === 0) {
            this.dataSource = new MatTableDataSource();
          }
        }
      });
    }
    else {
      let submitModel: settlement = {
        merchantId: this.id,
        pageNo: event.pageIndex + 1,
        size: event.pageSize,
        query: '',
        dateRange: this.Daterange,
        status: '',
      };
      this.MerchantView.Entitysettlement(submitModel).subscribe((res: any) => {
        this.Viewall = JSON.parse(res.response);
        this.content = this.Viewall?.data?.content || [];
        this.filteredData = this.content;
        this.datas = this.Viewall.data;
        this.length = this.datas.totalElements;
        this.pageIndex = this.datas.number;
        this.pageSize = this.datas.size;
        this.filterAction = 0;
        this.dataSource = new MatTableDataSource(this.filteredData);
        if (this.content.length === 0) {
          this.dataSource = new MatTableDataSource();
        }
      });
    }
  }

  exportexcel(data: any[]) {
    let sno = 1;
    this.responseDataListnew = [];
    data.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.accountId);
      this.response.push(element?.payoutId);
      this.response.push(element?.beneficiaryId);
      this.response.push(element?.amount);
      this.response.push(element?.reference);
      this.response.push(element?.txnItem);
      if (element?.txnTime) {
        this.response.push(
          moment(element?.txnTime).format('DD/MM/yyyy hh:mm a')
        );
      }
      else {
        this.response.push('');
      }
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    const header = [
      'S.No',
      'Account ID',
      'Payout ID',
      'Beneficiary ID',
      'Amount',
      'Reference',
      'Txn Item',
      'Txn Time',
    ];
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Entity Settlement');
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
    });

    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      FileSaver.saveAs(blob, 'Entity Settlements Online.xlsx');
    });
  };

  transactionsDropdown(event: any) {
    this.selectedTransactionType = event.target.value;
    this.updateTableData();
  };

  updateTableData() {
    if (this.selectedTransactionType === 'Online Settlement') {
      this.postrenewal();
    } else if (this.selectedTransactionType === 'Offline Settlement') {
      this.getOfflineSeetlements();
    }
  };

  getOfflineSeetlements() {
    let submitModel: OfflineSettlement = {
      merchantId: this.id,
      pageNo: '0',
      size: '5',
      query: '',
      dateRange: this.DaterangeOffline,
    };
    this.MerchantView.Entitysettlementoffline(submitModel).subscribe((res: any) => {
      this.Viewalloffline = JSON.parse(res.response);
      this.contentoffline = this.Viewalloffline?.content || [];
      this.datasOffline = this.Viewalloffline;
      this.lengthoffline = this.datasOffline.totalElements;
      this.pageIndexoffline = this.datasOffline.number;
      this.pageSizeoffline = this.datasOffline.size;
      this.filterActionoffline = 0;
      this.dataSourcesoffline = new MatTableDataSource(this.contentoffline);
      if (this.contentoffline.length === 0) {
        this.dataSourcesoffline = new MatTableDataSource();
      }
    });
  };

  checkDateoffline() {
    this.ToDateRangeoffline = '';
  };

  resetFilteroffline() {
    this.filterActionoffline = 0;
    this.FromDateRangeoffline = '';
    this.ToDateRangeoffline = '';
    this.DaterangeOffline = '';
    this.getOfflineSeetlements();
  };


  filterdateoffline() {
    const datepipe: DatePipe = new DatePipe('en-US');
    let formattedstartDate = datepipe.transform(this.FromDateRangeoffline, 'dd/MM/YYYY HH:mm');
    let formattedendDate = datepipe.transform(this.ToDateRangeoffline, 'dd/MM/yyyy HH:mm');
    this.DaterangeOffline = formattedstartDate + ' ' + '-' + ' ' + formattedendDate;
    let submitModel: OfflineSettlement = {
      merchantId: this.id,
      pageNo: '0',
      size: '5',
      query: '',
      dateRange: this.DaterangeOffline,
    };
    this.MerchantView.Entitysettlementoffline(submitModel).subscribe((res: any) => {
      this.Viewalloffline = JSON.parse(res.response);
      this.contentoffline = this.Viewalloffline?.content || [];
      this.datasOffline = this.Viewalloffline;
      this.lengthoffline = this.datasOffline.totalElements;
      this.pageIndexoffline = this.datasOffline.number;
      this.pageSizeoffline = this.datasOffline.size;
      this.filterActionoffline = 1;
      this.dataSourcesoffline = new MatTableDataSource(this.contentoffline);
      if (this.contentoffline.length === 0) {
        this.dataSourcesoffline = new MatTableDataSource();
      }
    });
  };

  getDataoffline(event: any) {
    if (this.filterActionoffline == 1) {
      const datepipe: DatePipe = new DatePipe('en-US');
      let formattedstartDate = datepipe.transform(this.FromDateRangeoffline, 'dd/MM/YYYY HH:mm');
      let formattedendDate = datepipe.transform(this.ToDateRangeoffline, 'dd/MM/yyyy HH:mm');
      this.DaterangeOffline = formattedstartDate + ' ' + '-' + ' ' + formattedendDate;
      let submitModel: OfflineSettlement = {
        merchantId: this.id,
        pageNo: event.pageIndexoffline + 1,
        size: event.pageSizeoffline,
        query: '',
        dateRange: this.DaterangeOffline,
      };
      this.MerchantView.Entitysettlementoffline(submitModel).subscribe((res: any) => {
        this.Viewalloffline = JSON.parse(res.response);
        this.contentoffline = this.Viewalloffline?.content || [];
        this.datasOffline = this.Viewalloffline;
        this.lengthoffline = this.datasOffline.totalElements;
        this.pageIndexoffline = this.datasOffline.number;
        this.pageSizeoffline = this.datasOffline.size;
      this.filterActionoffline = 1;
        this.dataSourcesoffline = new MatTableDataSource(this.contentoffline);
        if (this.contentoffline.length === 0) {
          this.dataSourcesoffline = new MatTableDataSource();
        }
      });
    }
    else {
      let submitModel: OfflineSettlement = {
        merchantId: this.id,
        pageNo: event.pageIndexoffline + 1,
        size: event.pageSizeoffline,
        query: '',
        dateRange: this.DaterangeOffline,
      };
      this.MerchantView.Entitysettlementoffline(submitModel).subscribe((res: any) => {
        this.Viewalloffline = JSON.parse(res.response);
        this.contentoffline = this.Viewalloffline?.content || [];
        this.datasOffline = this.Viewalloffline;
        this.lengthoffline = this.datasOffline.totalElements;
        this.pageIndexoffline = this.datasOffline.number;
        this.pageSizeoffline = this.datasOffline.size;
      this.filterActionoffline = 0;
        this.dataSourcesoffline = new MatTableDataSource(this.contentoffline);
        if (this.contentoffline.length === 0) {
          this.dataSourcesoffline = new MatTableDataSource();
        }
      });
    }
  };


  exportexceloffline(data:any[]) {
    let sno = 1;
    this.responseDataListnewoffline = [];
    data.forEach((element: any) => {
      this.offlineresponse = [];
      this.offlineresponse.push(sno);
      this.offlineresponse.push(element?.accountId);
      this.offlineresponse.push(element?.accountPayoutId);
      this.offlineresponse.push(element?.id);
      this.offlineresponse.push(element?.amount);
      this.offlineresponse.push(element?.txnReference);
      this.offlineresponse.push(element?.txnItem);
      if (element?.txnTime) {
        this.offlineresponse.push(
          moment(element?.txnTime).format('DD/MM/yyyy hh:mm a')
        );
      }
      else {
        this.offlineresponse.push('');
      }
      sno++;
      this.responseDataListnewoffline.push(this.offlineresponse);
    });
    this.excelexportCustomeroffline();
  }

  excelexportCustomeroffline() {
    const header = [
      'S.No',
      'Account ID',
      'Payout ID',
      'Beneficiary ID',
      'Amount',
      'Reference',
      'Txn Item',
      'Txn Time',
    ];
    const data = this.responseDataListnewoffline;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Entity Settlement');
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
    });

    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      FileSaver.saveAs(blob, 'Entity Settlement Offline.xlsx');
    });
  };







  exportData() {
    if (this.length != 0) {
      if (this.filterAction == 1) {
        const datepipe: DatePipe = new DatePipe('en-US');
        let formattedstartDate = datepipe.transform(this.FromDateRange, 'dd/MM/YYYY HH:mm');
        let formattedendDate = datepipe.transform(this.ToDateRange, 'dd/MM/yyyy HH:mm');
        this.Daterange = formattedstartDate + ' ' + '-' + ' ' + formattedendDate;
        let submitModel: settlement = {
          merchantId: this.id,
          pageNo: 1,
          size: this.length,
          query: '',
          dateRange: this.Daterange,
          status: '',
        };
        this.MerchantView.Entitysettlement(submitModel).subscribe((res: any) => {
          if (res.flag == 1) {
            this.Viewall = JSON.parse(res.response);
            this.content = this.Viewall?.data?.content || [];
            this.filteredData = this.content;
            this.exportexcel(this.filteredData)
          }
        });
      }
      else {
        let submitModel: settlement = {
          merchantId: this.id,
          pageNo: 1,
          size: this.length,
          query: '',
          dateRange: this.Daterange,
          status: '',
        };
        this.MerchantView.Entitysettlement(submitModel).subscribe((res: any) => {
          this.Viewall = JSON.parse(res.response);
          this.content = this.Viewall?.data?.content || [];
          this.filteredData = this.content;
          this.exportexcel(this.filteredData)
        });
      }
    }
    else {
      this.toastr.error('No record found');
    }
  }



  exportDataOffline() {
    if (this.lengthoffline != 0) {
      if (this.filterActionoffline == 1) {
      const datepipe: DatePipe = new DatePipe('en-US');
      let formattedstartDate = datepipe.transform(this.FromDateRangeoffline, 'dd/MM/YYYY HH:mm');
      let formattedendDate = datepipe.transform(this.ToDateRangeoffline, 'dd/MM/yyyy HH:mm');
      this.DaterangeOffline = formattedstartDate + ' ' + '-' + ' ' + formattedendDate;
      let submitModel: OfflineSettlement = {
        merchantId: this.id,
        pageNo: 1,
        size: this.lengthoffline,
        query: '',
        dateRange: this.DaterangeOffline,
      };
      this.MerchantView.Entitysettlementoffline(submitModel).subscribe((res: any) => {
        this.Viewalloffline = JSON.parse(res.response);
        this.contentoffline = this.Viewalloffline?.content || [];
        this.exportexceloffline(this.contentoffline);
      });
    }
    else {
      let submitModel: OfflineSettlement = {
        merchantId: this.id,
        pageNo: 1,
        size: this.lengthoffline,
        query: '',
        dateRange: this.DaterangeOffline,
      };
      this.MerchantView.Entitysettlementoffline(submitModel).subscribe((res: any) => {
        this.Viewalloffline = JSON.parse(res.response);
        this.contentoffline = this.Viewalloffline?.content || [];
        this.exportexceloffline(this.contentoffline);
      });
    }
    }
    else {
      this.toastr.error('No record found');
    }
  }


}
