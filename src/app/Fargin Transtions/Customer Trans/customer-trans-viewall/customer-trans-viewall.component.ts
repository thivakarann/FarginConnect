import { Component, ElementRef, ViewChild } from '@angular/core';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { CustomerTransViewComponent } from '../customer-trans-view/customer-trans-view.component';
import { customerpay } from '../../../fargin-model/fargin-model.module';


@Component({
  selector: 'app-customer-trans-viewall',
  templateUrl: './customer-trans-viewall.component.html',
  styleUrl: './customer-trans-viewall.component.css'
})
export class CustomerTransViewallComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'paymentId',
    'entityname',
    'customername',
    'paymentmethod',
    'amount',
    'paidAt',
    'Receipt',
    'CheckStatus',
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
  transaction: any;
  showcategoryData!:boolean;


  constructor(private service: FarginServiceService, private toastr: ToastrService, private dialog: MatDialog) { }



  ngOnInit(): void {

    this.service.CustomerAllTransactions().subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

    })
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  reload() {
    window.location.reload()
  }

  renderPage(event: any) {
    this.currentPage = event;
    this.ngOnInit();
  }
  reloaddata() {
    this.FromDateRange = "";
    this.ToDateRange = "";
    this.Daterange = "";
    this.currentPage = 1;
    this.ngOnInit();
  }

  filterdate() {
    // const datepipe: DatePipe = new DatePipe("en-US");
    // let formattedstartDate = datepipe.transform(this.FromDateRange, "dd/MM/YYYY HH:mm");
    // let formattedendDate = datepipe.transform(this.ToDateRange, "dd/MM/YYYY HH:mm");
    // this.Daterange = formattedstartDate + " " + "-" + " " + formattedendDate;
    // this.currentPage = 1;
 
    this.service.CustomerTransactionsFilter(this.FromDateRange, this.ToDateRange).subscribe((res: any) => {
      if (res.flag == 1) {
 
        this.transaction = res.response;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.showcategoryData= false;
      }
      else if (res.flag == 2) {
        this.showcategoryData = true;
      }
    })
  }
  reset() {
    window.location.reload();
  }

  Receipt(id: any) {
    this.service.CustomerReceipt(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },

    });
  }


  exportexcel() {
    console.log('check');
    let sno = 1;
    this.responseDataListnew = [];
    this.transaction.forEach((element: any) => {
      let createdate = element.paymentDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();

      let moddate = element.modifiedDatetime;
      this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.paymentId);
      this.response.push(element?.customerId?.merchantId?.merchantLegalName);
      this.response.push(element?.customerId?.customerName);
      this.response.push(element?.paymentMethod);
      this.response.push(element?.paidAmount);
      if (element?.paymentStatus == 'Success') {
        this.response.push(element?.paymentStatus);
      }
      else if (element?.paymentStatus == 'Pending') {
        this.response.push(element?.paymentStatus);
      }
      else if (element?.paymentStatus == 'Initiated') {
        this.response.push(element?.paymentStatus);
      }
      this.response.push(this.date1);

      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      'sno',
      'paymentId',
      'entityname',
      'customername',
      'paymentmethod',
      'amount',
      'paidAt',
      'status',

    ]


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

      }

      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    });

    data.forEach((d: any) => {
      // console.log("row loop");

      let row = worksheet.addRow(d);
      let qty = row.getCell(1);
      let qty1 = row.getCell(2);
      let qty2 = row.getCell(3);
      let qty3 = row.getCell(4);
      let qty4 = row.getCell(5);
      let qty5 = row.getCell(6);
      let qty6 = row.getCell(7);
      let qty7 = row.getCell(8);

      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }


    }
    );
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Entity Transaction.xlsx');
    });
  }

  transactionview(id: any) {

    this.dialog.open(CustomerTransViewComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: id,
      }
    })
  }

  track(id: any) {
    let submitModel: customerpay = {
      payId: id?.customerPayId,
      trackId: id?.trackId,
      paidAmount: id.paidAmount
    }
    this.service.Customerpay(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          window.location.reload()
        }, 400);
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }
}
