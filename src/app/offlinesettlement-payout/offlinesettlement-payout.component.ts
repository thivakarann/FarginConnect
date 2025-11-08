import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../service/fargin-service.service';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { oflinePayouts } from '../fargin-model/fargin-model.module';
import { Workbook } from 'exceljs';
import { DatePipe } from '@angular/common';
import FileSaver from 'file-saver';
import { Location } from '@angular/common';

@Component({
  selector: 'app-offlinesettlement-payout',
  templateUrl: './offlinesettlement-payout.component.html',
  styleUrl: './offlinesettlement-payout.component.css'
})
export class OfflinesettlementPayoutComponent implements OnInit {
  datas: any;
  responseDataListnew: any[] = [];
  filteredData: any;
  response: any[] = [];
  Viewall: any;
  viewdata: any;
  accountId: any;
  currentPage: any = 1;
  itemsPerPage = 5;
  page: number = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  term: any;
  payout: any;
  merchantid: any;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'settlementId',
    'accoundid',
    'payoutId',
    'amount',
    'reference',
    'txnItem',
    'createdAt',
  ];
  viewall: any;
  length: any;
  pageIndex: any;
  pageSize: any;
  searchPerformed: any;
  Daterange: any;
  FromDateRange: any;
  ToDateRange: any;
  maxDate: any;
  filterAction: any = 0;

  constructor(
    public service: FarginServiceService,
    private ActivateRoute: ActivatedRoute,
    private location: Location
  ) { }
  ngOnInit(): void {

    const today = new Date();
    this.maxDate = moment(today).format('yyyy-MM-DD').toString();

    this.ActivateRoute.params.subscribe((param: any) => {
      this.merchantid = param.id1;
      console.log("merchantid" + this.merchantid)
      this.payout = param.id;

      console.log("payout" + this.payout)
    });

    this.postrenewal();
  };

  postrenewal() {
    let submitModel: oflinePayouts = {
      pageNo: '0',
      size: '5',
      query: '',
      dateRange: '',
      payoutId: this.payout,
      merchantId: this.merchantid,
    };

    this.service.EntityOfflinePayouts(submitModel).subscribe((res: any) => {
      this.Viewall = JSON.parse(res?.response);
      this.viewdata = this.Viewall?.content;
      this.datas = this.Viewall.data;
      this.length = this.Viewall.totalElements;
      this.pageIndex = this.Viewall.number;
      this.pageSize = this.Viewall.size;
      this.dataSource = new MatTableDataSource(this.viewdata);
      if (this.viewdata.length === 0) {
        this.dataSource = new MatTableDataSource();
      }
    });
  };

  close() {
    this.location.back();
  };

  checkDate() {
    this.ToDateRange = '';
  }

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
    let submitModel: oflinePayouts = {
      pageNo: '0',
      size: '5',
      query: '',
      dateRange: this.Daterange,
      payoutId: this.payout,
      merchantId: this.merchantid,
    };
    this.service.EntityOfflinePayouts(submitModel).subscribe((res: any) => {
      this.Viewall = JSON.parse(res?.response);
      this.viewdata = this.Viewall?.content;
      this.datas = this.Viewall.data;
      this.length = this.Viewall.totalElements;
      this.pageIndex = this.Viewall.number;
      this.pageSize = this.Viewall.size;
      this.dataSource = new MatTableDataSource(this.viewdata);
      if (this.viewdata.length === 0) {
        this.dataSource = new MatTableDataSource();
      }
    });
  };

  getData(event: any) {
    if (this.filterAction == 1) {
      const datepipe: DatePipe = new DatePipe('en-US');
      let formattedstartDate = datepipe.transform(this.FromDateRange, 'dd/MM/YYYY HH:mm');
      let formattedendDate = datepipe.transform(this.ToDateRange, 'dd/MM/yyyy HH:mm');
      this.Daterange = formattedstartDate + ' ' + '-' + ' ' + formattedendDate;
      let submitModel: oflinePayouts = {
        pageNo: event.pageIndex + 1,
        size: event.pageSize,
        query: '',
        dateRange: this.Daterange,
        payoutId: this.payout,
        merchantId: this.merchantid,
      };
      this.service.EntityOfflinePayouts(submitModel).subscribe((res: any) => {
        this.Viewall = JSON.parse(res?.response);
        this.viewdata = this.Viewall?.content;
        this.datas = this.Viewall.data;
        this.length = this.Viewall.totalElements;
        this.pageIndex = this.Viewall.number;
        this.pageSize = this.Viewall.size;
        this.dataSource = new MatTableDataSource(this.viewdata);
        if (this.viewdata.length === 0) {
          this.dataSource = new MatTableDataSource();
        }
      });
    }
    else {
      let submitModel: oflinePayouts = {
        pageNo: event.pageIndex + 1,
        size: event.pageSize,
        query: '',
        dateRange: '',
        payoutId: this.payout,
        merchantId: this.merchantid,
      };
      this.service.EntityOfflinePayouts(submitModel).subscribe((res: any) => {
        this.Viewall = JSON.parse(res?.response);
        this.viewdata = this.Viewall?.content;
        this.datas = this.Viewall.data;
        this.length = this.Viewall.totalElements;
        this.pageIndex = this.Viewall.number;
        this.pageSize = this.Viewall.size;
        this.dataSource = new MatTableDataSource(this.viewdata);
        if (this.viewdata.length === 0) {
          this.dataSource = new MatTableDataSource();
        }
      });
    }

  }
  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.viewdata.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.accountPayoutId);
      this.response.push(element?.terminalId);
      this.response.push(element?.amount);
      this.response.push(element?.txnReference);
      this.response.push(element?.txnItem);
      if (element?.txnTime) {
        this.response.push(moment(element?.txnTime).format('DD/MM/yyyy hh:mm a'));
      }
      else { this.response.push(''); }
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    const header = [
      'S.No',
      'Payout ID',
      'Terminal ID',
      'Amount',
      'Reference',
      'Txn Item',
      'Txn Time',
    ];
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('View All Payouts');
    worksheet.addRow([]);
    let headerRow = worksheet.addRow(header);
    headerRow.font = { bold: true };
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
    });
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      FileSaver.saveAs(blob, 'Offline PayOut Details.xlsx');
    });
  }

}
